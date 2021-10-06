import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shopify/restyle";
import Constants from "expo-constants";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ApiProvider } from "@yownes/api";
import { AuthProvider } from "@yownes/core";

import Root from "./src/navigation/Root";
import theme from "./src/lib/theme";

const uri = `${Constants.manifest.extra.apiUrl}/module/yownes/graphql`;

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ApiProvider uri={uri}>
          <AuthProvider>
            <StripeProvider
              publishableKey={Constants.manifest?.extra?.stripeKey}
              merchantIdentifier="merchant.com.yownes.test"
            >
              <NavigationContainer>
                <Root />
              </NavigationContainer>
            </StripeProvider>
          </AuthProvider>
        </ApiProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
