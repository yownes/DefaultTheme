import React, { useCallback } from "react";
import { RefreshControl, ScrollView, Alert } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";

import { CART } from "../../api/queries";
import { Box, Button, Loading } from "../../components/atoms";
import { CartProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";
import { useAuth } from "../../components/organisms/AuthContext";

import Summary from "./Components/Summary";
import Row from "./Components/Row";
import CartPlaceholder from "./Components/CartPlaceholder";

const Cart = ({ navigation }: CartProps) => {
  const { loading, data, refetch, networkStatus } = useQuery<ICart>(CART);
  const { isAuthenticated } = useAuth();
  const isEmpty = (data?.cart?.products?.length ?? 0) === 0;

  const toCheckout = useCallback(() => {
    if (isAuthenticated) {
      navigation.navigate("Checkout");
    } else {
      Alert.alert(
        "Iniciar sesión",
        "Para proceder con el pago es necesario que primero inicies sesión o te registres",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Iniciar sesión",
            style: "default",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ]
      );
    }
  }, [navigation, isAuthenticated]);

  if (loading && networkStatus !== NetworkStatus.refetch) {
    return <Loading />;
  }
  return isEmpty ? (
    <CartPlaceholder loading={loading} onRefresh={refetch} />
  ) : (
    <Box padding="m" flex={1} justifyContent="space-between">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <Box>
          {data?.cart?.products?.map((prod, i) => (
            <Box paddingBottom="m" key={prod?.key}>
              <Row product={prod!} />
            </Box>
          ))}
          <Summary cart={data?.cart} />
        </Box>
      </ScrollView>
      <Button
        onPress={toCheckout}
        margin="l"
        label={`Confirmar compra (${data?.cart?.total})`}
      />
    </Box>
  );
};

export default Cart;
