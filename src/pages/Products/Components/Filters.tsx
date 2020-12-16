import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "../../../components/atoms";
import { Grid, List } from "../../../components/icons";

interface FiltersProps {
  list: boolean;
  onListChange: (value: boolean) => void;
}

export const BAR_HEIGHT = 44;

const Filters = ({ list, onListChange }: FiltersProps) => {
  return (
    <Box
      padding="m"
      alignItems="center"
      backgroundColor="white"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Text>Filters</Text>
      <TouchableOpacity onPress={() => onListChange(!list)}>
        {list ? (
          <Grid color="dark" width={24} height={24} />
        ) : (
          <List color="dark" width={24} height={24} />
        )}
      </TouchableOpacity>
      <Text>More filters</Text>
    </Box>
  );
};

export default Filters;
