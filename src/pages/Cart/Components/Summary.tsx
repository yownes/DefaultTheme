import { useMutation } from "@apollo/client";
import React from "react";
import { TouchableOpacity } from "react-native";

import { REMOVE_DISCOUNT } from "../../../api/mutations";
import { Cart_cart } from "../../../api/types/Cart";
import {
  RemoveDiscount,
  RemoveDiscountVariables,
} from "../../../api/types/RemoveDiscount";
import { Box, Card, Text } from "../../../components/atoms";

interface SummaryProps {
  cart?: Cart_cart;
}

const Summary = ({ cart }: SummaryProps) => {
  const [removeDiscount] = useMutation<RemoveDiscount, RemoveDiscountVariables>(
    REMOVE_DISCOUNT
  );
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
        <Text variant="header3">{cart.total?.label}</Text>
        <Text variant="header3">{cart.total?.value}</Text>
      </Box>

      {cart.vouchers?.allowed && Boolean(cart.vouchers?.added?.length) && (
        <Box
          marginTop="l"
          paddingTop="l"
          borderTopWidth={1}
          borderColor="greyscale5"
        >
          {cart.vouchers?.added?.map((voucher, i) => (
            <Box
              key={voucher?.id}
              justifyContent="space-between"
              flexDirection="row"
              marginBottom={i === cart.vouchers?.added?.length - 1 ? "s" : "m"}
            >
              <Box flexDirection="row">
                <Text>{voucher?.name}</Text>
                {voucher?.code && <Text> - {voucher.code}</Text>}
              </Box>
              <Box>
                <Text>{voucher?.reduction}</Text>
                {voucher?.code && (
                  <TouchableOpacity
                    onPress={() => {
                      removeDiscount({ variables: { id: voucher.id } });
                    }}
                  >
                    <Text color="danger" paddingVertical="s">
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default Summary;
