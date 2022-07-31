import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";
import app, { corsOptions } from "./app";

import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/typeDefs";
import accessEnv from "#root/helpers/accessEnv";

import formatGraphQLErrors from "./formatGraphQLErrors";

async function bootstrap() {
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    formatError: formatGraphQLErrors,
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // Start the server
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: corsOptions });

  // Listen on port
  const port = accessEnv("PORT", 7000);
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 API-Gateway ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
}

bootstrap();
