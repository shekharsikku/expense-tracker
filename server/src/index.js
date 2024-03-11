import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { startStandaloneServer } from "@apollo/server/standalone";
import mergedTypeDef from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";


dotenv.config({ path: "./.env" });

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDef,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res }),
    })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);