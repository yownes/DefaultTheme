import React from "react";
import { Box, Button, Text } from "../../components/atoms";
import { ProductsProps } from "../../navigation/Products";

const Products = ({ navigation, route }: ProductsProps) => {
  const category = route.params?.category;
  return (
    <Box>
      <Text variant="header2">Products{category && ` from ${category}`}</Text>
      <Button
        onPress={() => navigation.navigate("Product", { id: "miID" })}
        label="Go to Details"
      />
    </Box>
  );
};

export default Products;
