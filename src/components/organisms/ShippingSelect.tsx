import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { ADDRESS_LIST } from "../../api/queries";
import { AddressList } from "../../api/types/AddressList";
import { Box, Card, Text } from "../atoms";
import { Address, Placeholder } from "../molecules";
import ShippingImage from "../images/Shipping";

import Directions from "./Directions";
import { useCheckout } from "./CheckoutContext";

const ShippingSelect = () => {
  const ref = useRef<BottomSheetModal>(null);
  const { setAddress, address } = useCheckout();
  const { data } = useQuery<AddressList>(ADDRESS_LIST);
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
        <Box justifyContent="space-around" flexDirection="row" marginTop="l">
          <TouchableOpacity
            onPress={() => {
              ref.current?.present();
            }}
          >
            <Text>Cambiar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Dirección de facturación</Text>
          </TouchableOpacity>
        </Box>
      </Card>
      <BottomSheetModal
        snapPoints={[300]}
        ref={ref}
        backdropComponent={BottomSheetBackdrop}
      >
        <Box padding="l">
          <Directions
            onSelect={(address) => {
              const idx = data?.accountAddressList?.find(
                (a) => a?.id === address.id
              );
              if (idx) {
                setAddress?.(idx);
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
