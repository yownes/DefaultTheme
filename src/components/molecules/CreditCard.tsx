import React from "react";

import { Box, Text } from "../atoms";

interface CreditCardProps {
  name: string;
  last4: string;
  expiry: string;
}

const CreditCard = ({ name, last4, expiry }: CreditCardProps) => {
  return (
    <Box borderRadius={15} backgroundColor="primary" padding="l">
      <Text
        variant="header"
        marginTop="xl"
        marginBottom="m"
      >{`**** **** **** ${last4}`}</Text>
      <Text variant="header4">{name}</Text>
      <Text>{`EXP: ${expiry}`}</Text>
    </Box>
  );
};

export default CreditCard;
