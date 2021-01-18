import React, { ReactNode } from "react";

import Box from "./Box";
import Text from "./Text";

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <Box backgroundColor="primary" paddingVertical="s" paddingHorizontal="m">
      <Text variant="buttonLabel" color="white">
        {children}
      </Text>
    </Box>
  );
};

export default Tag;
