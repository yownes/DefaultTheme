import React from "react";
import { Box, Text } from "../../../components/atoms";
import { EmptyCart } from "../../../components/images";
import { InterestProducts } from "../../../components/organisms";

const CartPlaceholder = () => {
  return (
    <Box padding="l">
      <EmptyCart />
      <Text variant="header2" textAlign="center" marginVertical="xl">
        Tu carrito está vacío
      </Text>
      <InterestProducts />
    </Box>
  );
};

export default CartPlaceholder;
