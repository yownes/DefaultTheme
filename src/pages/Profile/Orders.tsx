import React from "react";

import { Box, Button, Text } from "../../components/atoms";
import { OrdersProps } from "../../navigation/Profile";

const Orders = ({ navigation }: OrdersProps) => {
  return (
    <Box>
      <Text>Orders</Text>
      <Button
        onPress={() => navigation.navigate("Order", { id: "OrderId" })}
        label="Go to Order"
      />
    </Box>
  );
};

export default Orders;
