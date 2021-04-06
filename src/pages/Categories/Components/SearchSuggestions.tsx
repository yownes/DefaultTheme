import React from "react";
import { FlatList } from "react-native";

import { BasicProduct } from "../../../api/types/BasicProduct";
import { Box, Card } from "../../../components/atoms";

import ProductSuggestion from "./ProductSuggestion";

interface SearchSuggestionsProps {
  products: BasicProduct[];
}

const SearchSuggestions = ({ products }: SearchSuggestionsProps) => {
  return (
    <Card flex={1} variant="elevated">
      <FlatList
        data={products}
        keyExtractor={(item, idx) => item.id ?? idx.toString()}
        renderItem={({ item }) => (
          <Box paddingBottom="m">
            <ProductSuggestion product={item} />
          </Box>
        )}
      />
    </Card>
  );
};

export default SearchSuggestions;
