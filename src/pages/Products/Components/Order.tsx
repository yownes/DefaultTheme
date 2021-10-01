import React from "react";
import { TouchableOpacity } from "react-native";
import { Products_productsList_sortOrders } from "@yownes/api";

import { Box, Text } from "../../../components/atoms";

interface OrderProps {
  sortOrders: Products_productsList_sortOrders[] | null;
  onOrderSelected: (sort: string, order: string) => void;
}

const Order = ({ sortOrders, onOrderSelected }: OrderProps) => {
  return (
    <Box>
      <Text variant="header2">Ordenar por</Text>
      <Box>
        {sortOrders?.map((order) => (
          <TouchableOpacity
            key={order.label}
            onPress={() => {
              onOrderSelected(order.field, order.direction);
            }}
          >
            <Box paddingVertical="m">
              <Text>{order.label}</Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
};

export default Order;
