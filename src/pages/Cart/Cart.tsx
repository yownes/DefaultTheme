import { useQuery } from "@apollo/client";
import React from "react";
import { CART } from "../../api/queries";
import { Box, Button, Text } from "../../components/atoms";
import { CartProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const Cart = ({ navigation }: CartProps) => {
  const { loading, data } = useQuery<ICart>(CART);
  useIsFocused();
  useFocusEffect(() => {});
  return (
    <Box>
      <Text>Cart {data?.cart?.total}</Text>
      {data?.cart?.products?.map((prod, i) => (
        <Box key={i}>
          <Text>{prod?.product?.name}</Text>
          <Text>{prod?.quantity}</Text>
        </Box>
      ))}
      <Button
        onPress={() => navigation.navigate("Checkout")}
        label="Checkout"
      />
    </Box>
  );
};

export default Cart;
