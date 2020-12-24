import React from "react";
import { Image } from "react-native";
import { Box, Text } from "../atoms";

interface PlaceholderProps {
  image?: string;
  text: string;
}

const Placeholder = ({ image, text }: PlaceholderProps) => {
  return (
    <Box>
      <Image source={{ uri: image }} />
      <Text textAlign="center">{text}</Text>
    </Box>
  );
};

export default Placeholder;
