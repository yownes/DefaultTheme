import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "../../../components/atoms";
import { Grid, List } from "../../../components/icons";

interface FiltersProps {
  list: boolean;
  onListChange: (value: boolean) => void;
}

const Filters = ({ list, onListChange }: FiltersProps) => {
  return (
    <Box
      padding="l"
      backgroundColor="white"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Text>Filters</Text>
      <TouchableOpacity onPress={() => onListChange(!list)}>
        {list ? <List color="dark" /> : <Grid color="dark" />}
      </TouchableOpacity>
      <Text>More filters</Text>
    </Box>
  );
};

export default Filters;
