// src/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4002/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});
