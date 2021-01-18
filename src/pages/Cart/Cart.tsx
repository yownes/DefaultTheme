import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";

import { CART } from "../../api/queries";
import { Box, Button, Loading } from "../../components/atoms";
import { CartProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";

import Summary from "./Components/Summary";
import Row from "./Components/Row";
import CartPlaceholder from "./Components/CartPlaceholder";

const Cart = ({ navigation }: CartProps) => {
  const { loading, data, refetch, networkStatus } = useQuery<ICart>(CART);
  const isEmpty = (data?.cart?.products?.length ?? 0) === 0;
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
        onPress={() => navigation.navigate("Checkout")}
        margin="l"
        label={`Confirmar compra (${data?.cart?.total})`}
      />
    </Box>
  );
};

export default Cart;
