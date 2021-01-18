import React from "react";

import { Cart_cart } from "../../../api/types/Cart";
import { Box, Card, Text } from "../../../components/atoms";

interface SummaryProps {
  cart: Cart_cart;
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <Card padding="l">
      <Text variant="header3" paddingBottom="m">
        Resumen del pedido
      </Text>
      <Box flexDirection="row" justifyContent="space-between" paddingBottom="m">
        <Text>Cantidad</Text>
        <Text>{cart.products?.length}</Text>
      </Box>
      <Box flexDirection="row" justifyContent="space-between" paddingBottom="m">
        <Text>Subtotal</Text>
        <Text>{cart.total}</Text>
      </Box>
      <Box flexDirection="row" justifyContent="space-between" paddingBottom="m">
        <Text>Envío</Text>
        <Text>-</Text>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Text variant="header3">Total</Text>
        <Text variant="header3">{cart.total}</Text>
      </Box>
    </Card>
  );
};

export default Summary;
