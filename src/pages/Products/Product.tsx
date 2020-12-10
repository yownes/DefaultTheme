import React from 'react';
import { Box, Text } from '../../components/atoms';
import { ProductProps } from '../../navigation/Products';

const Product = ({ route }: ProductProps) => {
  return (
    <Box>
      <Text>Product {route.params.id}</Text>
    </Box>
  );
};

export default Product;
