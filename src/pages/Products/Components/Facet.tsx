import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { Box, Tag, Text } from "../../../components/atoms";
import { Products_productsList_facets } from "../../../api/types/Products";

interface FacetProps {
  facet: Products_productsList_facets | null;
  selected: string;
  onSelect: (value: string) => void;
}

const Facet = ({ facet, selected, onSelect }: FacetProps) => {
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
            onPress={() => onSelect(filter?.value)}
          >
            <Box padding="m">
              <Tag light={filter?.active}>{filter?.label}</Tag>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Facet;
