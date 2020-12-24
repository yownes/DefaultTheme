import React from "react";
import { AddressList_accountAddressList } from "../../api/types/AddressList";
import { Box, Text } from "../atoms";
import { Stamp } from "../icons";

interface AddressProps {
  address: AddressList_accountAddressList;
}

const Address = ({ address }: AddressProps) => {
  return (
    <Box
      borderRadius={5}
      backgroundColor="greyscale2"
      padding="m"
      flexDirection="row"
    >
      <Stamp color="greyscale4" width={30} height={30} />
      <Box marginLeft="m">
        <Text color="greyscale4" marginBottom="l">
          {address.firstName} {address.lastName}
        </Text>
        <Text color="greyscale4" marginBottom="l">
          {address.address1}
        </Text>
        {address.address2 && (
          <Text color="greyscale4" marginBottom="l">
            {address.address2}
          </Text>
        )}
        <Text color="greyscale4">{address.city}</Text>
      </Box>
    </Box>
  );
};

export default Address;
