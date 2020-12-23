import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { extractTokenFromHeaders, getToken, saveToken } from "./auth";

const link = new HttpLink({
  uri: "http://yownes.localhost/module/yownes/graphql",
});

const cache = new InMemoryCache({});

const withToken = setContext(async () => {
  const token = await getToken();

  return { token };
});

const cookiesLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const ctx = operation.getContext();

    const headers = ctx?.response.headers;
    let token = ctx.token;

    if (!token && headers) {
      token = extractTokenFromHeaders(headers);
      if (token) saveToken(token);
    }
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Cookie: token,
      },
    }));
    return response;
  });
});

const client = new ApolloClient({
  link: cookiesLink.concat(link),
  cache,
});

export default client;
