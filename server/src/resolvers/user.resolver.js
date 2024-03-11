import { users } from "../temp/data.js";

const userResolver = {
    Query: {
        users: () => {
            return users
        }
    },

    Mutation: {

    }
}

export default userResolver;