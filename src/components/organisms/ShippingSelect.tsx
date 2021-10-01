import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useGetAddresses } from "@yownes/api";

import { Box, Card, Text } from "../atoms";
import { Address, Placeholder } from "../molecules";
import ShippingImage from "../images/Shipping";

import Directions from "./Directions";
import { useCheckout } from "./CheckoutContext";

const ShippingSelect = () => {
  const ref = useRef<BottomSheetModal>(null);
  const [change, setChange] = useState<"SHIPPING" | "PAYMENT">();
  const {
    setAddress,
    address,
    paymentAddress,
    setPaymentAddress,
  } = useCheckout();
  const { data } = useGetAddresses();
  useEffect(() => {
    if ((data?.accountAddressList?.length ?? 0) > 0) {
      setAddress?.(data?.accountAddressList[0]);
    }
  }, [data, setAddress]);
  return (
    <>
      <Card padding="l">
        <Text marginBottom="l">Dirección de envío</Text>
        {address ? (
          <Address address={address} />
        ) : (
          <Placeholder
            View={<ShippingImage />}
            text="Aún no tienes ninguna dirección añadida, crea una para poder comprar"
          />
        )}
        {paymentAddress && (
          <Box justifyContent="space-around" flexDirection="row" marginTop="l">
            <TouchableOpacity
              onPress={() => {
                setChange("SHIPPING");
                ref.current?.present();
              }}
            >
              <Text color="primary">Cambiar</Text>
            </TouchableOpacity>
          </Box>
        )}
        {paymentAddress && (
          <Box marginTop="l">
            <Text marginBottom="l">Dirección de facturación</Text>
            <Address address={paymentAddress} />
          </Box>
        )}
        <Box justifyContent="space-around" flexDirection="row" marginTop="l">
          <TouchableOpacity
            onPress={() => {
              setChange(paymentAddress ? "PAYMENT" : "SHIPPING");
              ref.current?.present();
            }}
          >
            <Text color="primary">Cambiar</Text>
          </TouchableOpacity>

          {!paymentAddress && (
            <TouchableOpacity
              onPress={() => {
                setChange("PAYMENT");
                ref.current?.present();
              }}
            >
              <Text color="primary">Dirección de facturación</Text>
            </TouchableOpacity>
          )}
        </Box>
      </Card>
      <BottomSheetModal
        snapPoints={[300]}
        ref={ref}
        backdropComponent={BottomSheetBackdrop}
      >
        <Box padding="l">
          <Directions
            title={
              change === "PAYMENT" ? "Dirección de facturación" : undefined
            }
            onSelect={(address) => {
              const idx = data?.accountAddressList?.find(
                (a) => a?.id === address.id
              );
              if (idx) {
                if (change === "PAYMENT") {
                  setPaymentAddress?.(idx);
                } else {
                  setAddress?.(idx);
                }
                ref.current?.close();
              }
            }}
          />
        </Box>
      </BottomSheetModal>
    </>
  );
};

export default ShippingSelect;
