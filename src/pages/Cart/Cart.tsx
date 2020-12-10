import React from 'react';
import { Box, Button, Text } from '../../components/atoms';
import { CartProps } from '../../navigation/Cart';

const Cart = ({ navigation }: CartProps) => {
  return (
    <Box>
      <Text>Cart</Text>
      <Button
        onPress={() => navigation.navigate('Checkout')}
        label="Checkout"
      />
    </Box>
  );
};

export default Cart;
