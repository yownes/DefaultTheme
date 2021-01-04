import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { CART } from "../../api/queries";
import { Box, Button, Loading } from "../../components/atoms";
import { CartProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import CartPlaceholder from "./Components/CartPlaceholder";
import Row from "./Components/Row";
import Summary from "./Components/Summary";

const Cart = ({ navigation }: CartProps) => {
  const { loading, data } = useQuery<ICart>(CART);
  const isEmpty = (data?.cart?.products?.length ?? 0) === 0;
  if (loading) {
    return <Loading />;
  }
  return isEmpty ? (
    <CartPlaceholder />
  ) : (
    <Box padding="m" flex={1} justifyContent="space-between">
      <ScrollView>
        <Box>
          {data?.cart?.products?.map((prod, i) => (
            <Box paddingBottom="m" key={prod?.key}>
              <Row product={prod!!} />
            </Box>
          ))}
          <Summary cart={data?.cart} />
        </Box>
      </ScrollView>
      <Button
        onPress={() => navigation.navigate("Checkout")}
        margin="l"
        label={`Confirmar compra (${data?.cart?.total})`}
      />
    </Box>
  );
};

export default Cart;
