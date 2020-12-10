import React from 'react';
import { Box, Button, Text } from '../../components/atoms';
import { CheckoutProps } from '../../navigation/Cart';

const Checkout = ({ navigation }: CheckoutProps) => {
  return (
    <Box>
      <Text>Checkout</Text>
      <Button
        onPress={() => navigation.navigate('PaymentConfirmed')}
        label="PaymentConfirmed"
      />
    </Box>
  );
};

export default Checkout;
