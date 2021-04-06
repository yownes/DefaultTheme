import React from "react";

import { AddressFragment } from "../../api/types/AddressFragment";
import { Box, Text } from "../atoms";
import { Stamp } from "../icons";

interface AddressProps {
  address: AddressFragment;
}

const Address = ({ address }: AddressProps) => {
  return (
    <Box
      borderRadius={5}
      backgroundColor="greyscale2"
      padding="m"
      flexDirection="row"
      flex={1}
    >
      <Stamp color="greyscale4" size={30} />
      <Box marginLeft="m">
        <Text color="greyscale4" marginBottom="l">
          {address.firstName} {address.lastName}
        </Text>
        <Text color="greyscale4" marginBottom="m">
          {address.address1}
        </Text>
        {Boolean(address.address2) && (
          <Text color="greyscale4" marginBottom="m">
            {address.address2}
          </Text>
        )}
        <Text color="greyscale4">{address.city}</Text>
      </Box>
    </Box>
  );
};

export default Address;
