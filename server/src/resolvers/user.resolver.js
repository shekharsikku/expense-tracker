import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { name, username, password, gender } = input;

                if (!username || !name || !password || !gender) {
                    throw new Error("All fields are required!");
                }
                const existingUser = await User.findOne({ username });

                if (existingUser) {
                    throw new Error("User Already Exists!");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // https://avatar-placeholder.iran.liara.run/
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                });

                await newUser.save();
                await context.login(newUser);
                return newUser;
            } catch (error) {
                console.error("SignUp Error :", error.message);
                throw new Error(error.message || "Internal Server Error!");
            }
        },

        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                if (!username || !password) throw new Error("All fields are required!");
                const { user } = await context.authenticate("graphql-local", { username, password });

                await context.login(user);
                return user;
            } catch (error) {
                console.error("Login Error :", error.message);
                throw new Error(error.message || "Internal Server Error!");
            }
        },

        logout: async (_, __, context) => {
            try {
                await context.logout();
                context.req.session.destroy((error) => {
                    if (error) throw error.message;
                });
                context.res.clearCookie("connect.sid");
                return { message: "Logged Out Successfully!" };
            } catch (error) {
                console.error("Logout Error :", error.message);
                throw new Error(error.message || "Internal Server Error!");
            }
        },
    },

    Query: {
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (error) {
                console.error("Auth Error : ", error.message);
                throw new Error("Internal Server Error!");
            }
        },
        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.error("Query Error :", error.message);
                throw new Error(error.message || "Error Getting User!");
            }
        },
    },

    User: {
        transactions: async (parent) => {
            try {
                const transactions = await Transaction.find({ userId: parent._id });
                return transactions;
            } catch (error) {
                console.log("Error Getting Transactions!", error.message);
                throw new Error(err.message || "Internal Server Error!");
            }
        },
    },
};

export default userResolver;