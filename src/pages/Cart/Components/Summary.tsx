import React from "react";

import { Cart_cart } from "../../../api/types/Cart";
import { Box, Card, Text } from "../../../components/atoms";

interface SummaryProps {
  cart?: Cart_cart;
}

const Summary = ({ cart }: SummaryProps) => {
  if (!cart) return null;
  return (
    <Card padding="l">
      <Text variant="header3" paddingBottom="m">
        Resumen del pedido
      </Text>
      <Box flexDirection="row" justifyContent="space-between" paddingBottom="m">
        <Text>Cantidad</Text>
        <Text>{cart.products?.length}</Text>
      </Box>
      {cart.subtotals?.products && (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingBottom="m"
        >
          <Text>{cart.subtotals.products.label}</Text>
          <Text>{cart.subtotals?.products.value}</Text>
        </Box>
      )}
      {cart.subtotals?.discounts && (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingBottom="m"
        >
          <Text>{cart.subtotals.discounts.label}</Text>
          <Text>{cart.subtotals?.discounts.value}</Text>
        </Box>
      )}
      {cart.subtotals?.shipping && (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingBottom="m"
        >
          <Text>{cart.subtotals?.shipping.label}</Text>
          <Text>{cart.subtotals?.shipping.value}</Text>
        </Box>
      )}
      <Box flexDirection="row" justifyContent="space-between">
        <Text variant="header3">Total</Text>
        <Text variant="header3">{cart.total}</Text>
      </Box>
    </Card>
  );
};

export default Summary;
