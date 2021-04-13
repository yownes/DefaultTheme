import { useQuery } from "@apollo/client";
import React from "react";
import { ScrollView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { CART } from "../../api/queries";
import { Box, Button } from "../../components/atoms";
import { PaymentSelect, ShippingSelect } from "../../components/organisms";
import { CheckoutProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";

import Summary from "./Components/Summary";

const Checkout = ({ navigation }: CheckoutProps) => {
  const { data } = useQuery<ICart>(CART);
  return (
    <BottomSheetModalProvider>
      <ScrollView>
        <Box padding="m">
          <Summary cart={data?.cart} />
          <Box marginTop="m">
            <ShippingSelect />
          </Box>
          <Box marginTop="m">
            <PaymentSelect />
          </Box>
          <Button
            marginTop="m"
            onPress={() => navigation.navigate("PaymentConfirmed")}
            label="Confirmar Compra"
          />
        </Box>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default Checkout;
