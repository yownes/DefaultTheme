import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Reference,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";

import { extractTokenFromHeaders, getToken, saveToken } from "./auth";

const link = new HttpLink({
  uri: `${Constants.manifest.extra.apiUrl}/module/yownes/graphql`,
});

const cache = new InMemoryCache({
  typePolicies: {
    CartProductOption: {
      keyFields: false,
    },
    Cart: {
      fields: {
        products: {
          merge(existing: Reference[], incoming: Reference[]) {
            return incoming;
          },
        },
      },
    },
  },
});

const withToken = setContext(async () => {
  const token = await getToken();

  return { token };
});

const cookiesLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const ctx = operation.getContext();

    const headers = ctx?.response.headers;
    let { token } = ctx;

    if (!token && headers) {
      token = extractTokenFromHeaders(headers);
      if (token) {
        saveToken(token);
      }
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
  link: withToken.concat(cookiesLink.concat(link)),
  cache,
});

export default client;
