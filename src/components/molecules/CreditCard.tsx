import React from "react";

import { PaymentMethodFragment } from "../../api/types/PaymentMethodFragment";
import { Box, Card, Text } from "../atoms";

interface CreditCardProps {
  data: PaymentMethodFragment;
}

const CreditCard = ({ data }: CreditCardProps) => {
  return (
    <Card variant="elevated" backgroundColor="primary" padding="l">
      <Text
        variant="header"
        marginTop="xl"
        marginBottom="m"
      >{`****  ****  ****  ${data.last4}`}</Text>
      <Text variant="header4">{data.name}</Text>
      <Text>{`EXP: ${data.expMonth}/${data.expYear}`}</Text>
    </Card>
  );
};

export default CreditCard;
