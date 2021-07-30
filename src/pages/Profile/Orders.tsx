import React from "react";
import { useQuery } from "@apollo/client";
import { FlatList, Pressable } from "react-native";

import { Box, Button } from "../../components/atoms";
import { Order } from "../../components/molecules";
import { OrdersProps } from "../../navigation/Profile";
import { ORDERS } from "../../api/queries";
import { Orders as IOrders } from "../../api/types/Orders";
import { useTheme } from "../../lib/theme";

const Orders = ({ navigation }: OrdersProps) => {
  const { data } = useQuery<IOrders>(ORDERS);
  const theme = useTheme();
  return (
    <FlatList
      data={data?.orders}
      keyExtractor={(item) => String(item?.id)}
      contentContainerStyle={{
        paddingTop: theme.spacing.m,
        paddingHorizontal: theme.spacing.m,
      }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("Order", { id: item?.id })}
        >
          <Box paddingBottom="m">
            <Order order={item} />
          </Box>
        </Pressable>
      )}
    />
  );
};

export default Orders;
