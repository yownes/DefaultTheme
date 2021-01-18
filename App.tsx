import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shopify/restyle";
import { ApolloProvider } from "@apollo/client";

import Root from "./src/navigation/Root";
import theme from "./src/lib/theme";
import client from "./src/lib/apollo-client";
import { AuthProvider } from "./src/components/organisms/AuthContext";

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <NavigationContainer>
              <Root />
            </NavigationContainer>
          </AuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
