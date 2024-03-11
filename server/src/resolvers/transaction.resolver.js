import { transactions } from "../temp/data.js";

const transactionResolver = {
    Query: {
        transactions: () => {
            return transactions
        }
    },

    Mutation: {

    }
}

export default transactionResolver;