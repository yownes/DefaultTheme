import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { Box, Button, Text } from "../../../components/atoms";
import { CreditCard, Placeholder, Slider } from "../../../components/molecules";
import BillingImage from "../../../components/images/Billing";
import { PAYMENT_METHOD_LIST } from "../../../api/queries";
import { PaymentMethodList } from "../../../api/types/PaymentMethodList";

const Payments = () => {
  const { data } = useQuery<PaymentMethodList>(PAYMENT_METHOD_LIST);
  const navigation = useNavigation();
  return (
    <Box>
      <Text variant="header3" marginBottom="l">
        Método de pago
      </Text>
      {data?.accountPaymentMethodList &&
      data.accountPaymentMethodList.length > 0 ? (
        <Slider>
          {data?.accountPaymentMethodList.map((method) => (
            <TouchableOpacity key={method?.id}>
              {method && <CreditCard data={method} />}
            </TouchableOpacity>
          ))}
        </Slider>
      ) : (
        <Placeholder
          View={<BillingImage />}
          text="Aún no tienes ningún método de pago añadido, crea uno para poder comprar"
        />
      )}
      <Button
        onPress={() => navigation.navigate("AddPaymentMethod")}
        marginTop="l"
        label="Add Payment Method"
      />
    </Box>
  );
};

export default Payments;
