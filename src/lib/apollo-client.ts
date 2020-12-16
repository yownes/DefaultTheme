import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: "http://yownes.localhost/module/yownes/graphql",
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
