import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { CART } from "../../api/queries";
import { Box, Button } from "../../components/atoms";
import { CartProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import CartPlaceholder from "./Components/CartPlaceholder";
import Row from "./Components/Row";
import Summary from "./Components/Summary";

const Cart = ({ navigation }: CartProps) => {
  const { loading, data } = useQuery<ICart>(CART);
  useIsFocused();
  useFocusEffect(() => {});
  return data?.cart?.products ? (
    <Box padding="m" flex={1} justifyContent="space-between">
      <ScrollView>
        <Box>
          {data?.cart?.products?.map((prod, i) => (
            <Box paddingBottom="m" key={prod?.product?.id}>
              <Row product={prod!!} />
            </Box>
          ))}
          <Summary cart={data.cart} />
        </Box>
      </ScrollView>
      <Button
        onPress={() => navigation.navigate("Checkout")}
        margin="l"
        label={`Confirmar compra (${data.cart.total})`}
      />
    </Box>
  ) : (
    <CartPlaceholder />
  );
};

export default Cart;
