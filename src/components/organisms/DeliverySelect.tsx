import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { TouchableOpacity } from "react-native";

import { SET_DELIVERY_OPTION } from "../../api/mutations";
import { CARRIER_LIST } from "../../api/queries";
import { CarrierList } from "../../api/types/CarrierList";
import {
  SetDeliveryOption,
  SetDeliveryOptionVariables,
} from "../../api/types/SetDeliveryOption";
import { Card, Text, Box, RadioButton } from "../atoms";

interface DeliverySelectProps {
  selected: string;
}

const DeliverySelect = ({ selected }: DeliverySelectProps) => {
  const { data } = useQuery<CarrierList>(CARRIER_LIST);
  const [setDeliveryOption] = useMutation<
    SetDeliveryOption,
    SetDeliveryOptionVariables
  >(SET_DELIVERY_OPTION);
  return (
    <Card padding="l">
      <Text marginBottom="l">Método de envío</Text>
      {data?.carrierList?.map((carrier) => (
        <TouchableOpacity
          key={carrier?.id}
          onPress={() => {
            if (carrier?.reference) {
              setDeliveryOption({
                variables: { option: carrier.reference },
              });
            }
          }}
        >
          <Box flexDirection="row" alignItems="center">
            <RadioButton active={selected === carrier?.reference} />
            <Box flex={1} padding="m">
              <Text variant="header3">{carrier?.name}</Text>
              <Box flexDirection="row" justifyContent="space-between">
                <Text>{carrier?.delay}</Text>
                <Text>{carrier?.price}</Text>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      ))}
    </Card>
  );
};

export default DeliverySelect;
