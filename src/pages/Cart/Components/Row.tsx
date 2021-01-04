import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, Card, Tag, Text } from "../../../components/atoms";
import { Quantity } from "../../../components/molecules";
import { Cart_cart_products } from "../../../api/types/Cart";

interface RowProps {
  product: Cart_cart_products;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

const Row = ({ product }: RowProps) => {
  return (
    <Card padding="s" flexDirection="row" alignItems="center">
      <Image source={{ uri: product.product?.image }} style={styles.image} />
      <Box
        padding="m"
        justifyContent="space-between"
        alignSelf="stretch"
        flex={1}
      >
        <Box justifyContent="space-between" flexDirection="row">
          <Box flex={1}>
            <Text style={{ flexShrink: 1 }}>{product.product?.name}</Text>
          </Box>
          <Box>
            <Tag>{product.product?.price}</Tag>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            {product.option?.map((option) => (
              <Text key={option?.name} paddingRight="m">
                <Text variant="header3">{option?.name}:</Text> {option?.value}
              </Text>
            ))}
          </Box>
          <Box alignItems="flex-end">
            <Quantity qty={product.quantity!!} limit={2} onChange={() => {}} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Row;
