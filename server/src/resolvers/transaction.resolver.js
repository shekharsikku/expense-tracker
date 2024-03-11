import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (error) {
                console.error("Transactions Error :", error.message);
                throw new Error("Transactions Error!");
            }
        },

        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.error("Transaction Error :", error.message);
                throw new Error("Transaction Error!");
            }
        },

        // Category Statics Query Remains!
    },

    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                });
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                console.error("Error Creating Transaction :", error.message);
                throw new Error("Error Creating Transaction!");
            }
        },

        updateTransaction: async (_, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
                    new: true,
                });
                return updatedTransaction;
            } catch (error) {
                console.error("Error Updating Transaction :", error.message);
                throw new Error("Error Updating Transaction!");
            }
        },

        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (error) {
                console.error("Error Deleting Transaction :", error.message);
                throw new Error("Error Deleting Transaction!");
            }
        },
    }

    // Transaction User Relation Remains!
}

export default transactionResolver;