import React from "react";
import { Dimensions, Image, View, StyleSheet } from "react-native";

import { Text, Box } from "../atoms";
import { Home_home_slides_slides } from "../../api/types/Home";

const { width } = Dimensions.get("window");

interface HomeSlideProps {
  slide?: Home_home_slides_slides | null;
}

const HomeSlide = ({ slide }: HomeSlideProps) => {
  const aspectRatio = (slide?.size?.height ?? 1) / (slide?.size?.width ?? 1);
  if (!slide) {
    return null;
  }
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={{ uri: slide?.imageUrl }}
        style={{ width, height: width * aspectRatio }}
      />
      <Box padding="l" justifyContent="center" style={StyleSheet.absoluteFill}>
        <Text variant="header" color="white">
          {slide.title}
        </Text>
      </Box>
    </View>
  );
};

export default HomeSlide;
