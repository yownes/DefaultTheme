import React from 'react';
import { Box, Text } from '../../components/atoms';
import { OrderProps } from '../../navigation/Profile';

const Order = ({ route }: OrderProps) => {
  return (
    <Box>
      <Text>Order: {route.params.id}</Text>
    </Box>
  );
};

export default Order;
