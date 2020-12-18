import React from "react";
import { useQuery } from "@apollo/client";
import { Home as IHome } from "../api/types/Home";
import { Box, Button, Text, Loading } from "../components/atoms";
import { HOME } from "../api/queries";
import { HorizontalScrollProducts } from "../components/molecules";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigation }: any) => {
  const { loading, data } = useQuery<IHome>(HOME);
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <Text variant="header" paddingTop="xl" paddingHorizontal="l">
        {data?.home?.meta?.title}
      </Text>
      <Text variant="header2" paddingHorizontal="l" paddingTop="m">
        {data?.home?.meta?.description}
      </Text>
      {data?.latestProducts?.content && (
        <Box paddingVertical="l">
          <HorizontalScrollProducts
            products={data.latestProducts.content}
            title="Últimos productos"
          />
        </Box>
      )}
      <Box paddingVertical="l">
        <HorizontalScrollProducts
          products={data?.specialProducts?.content}
          title="Especiales"
        />
      </Box>
      <Box paddingVertical="l">
        <HorizontalScrollProducts
          products={data?.bestSells}
          title="Los más vendidos"
        />
      </Box>
      <Box padding="l">
        <Button
          onPress={() => navigation.navigate("About")}
          label="Sobre nosotros"
        />
      </Box>
    </ScrollView>
  );
};

export default Home;
