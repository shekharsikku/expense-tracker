import { transactions } from "../temp/data.js";

const transactionResolver = {
    Query: {
        users: () => {
            return transactions
        }
    },

    Mutation: {

    }
}

export default transactionResolver;