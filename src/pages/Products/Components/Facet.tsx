import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { Box, Tag, Text } from "../../../components/atoms";
import { Products_productsList_facets } from "../../../api/types/Products";

interface FacetProps {
  facet: Products_productsList_facets | null;
  onSelect: (value: string) => void;
}

const Facet = ({ facet, onSelect }: FacetProps) => {
  if (!facet) {
    return null;
  }
  return (
    <Box>
      <Text>{facet.label}</Text>
      <ScrollView horizontal>
        {facet?.filters?.map((filter) => (
          <TouchableOpacity
            key={filter?.label}
            onPress={() => {
              if (filter?.value) {
                onSelect(filter.value);
              }
            }}
          >
            <Box padding="m">
              <Tag light={filter?.active ?? undefined}>{filter?.label}</Tag>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Facet;
