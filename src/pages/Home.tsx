import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { Home as IHome } from "../api/types/Home";
import { Box, Button, Text, Loading } from "../components/atoms";
import { HOME } from "../api/queries";
import { HorizontalScrollProducts, HomeSlide } from "../components/molecules";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  banner: {
    width,
    height: 100,
  },
});

const Home = ({ navigation }: any) => {
  const { loading, data } = useQuery<IHome>(HOME);
  navigation.setOptions({
    title: data?.home?.meta?.title ?? "",
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <Image source={{ uri: data?.home?.banner }} style={styles.banner} />
      <ScrollView horizontal snapToInterval={width} decelerationRate="fast">
        {data?.home?.slides?.slides?.map((slide) => (
          <HomeSlide key={slide?.id} slide={slide} />
        ))}
      </ScrollView>
      {data?.specialProducts?.content && (
        <Box paddingVertical="l">
          <HorizontalScrollProducts
            products={data?.specialProducts?.content}
            title="En Oferta"
          />
        </Box>
      )}
      {data?.latestProducts?.content && (
        <Box paddingVertical="l">
          <HorizontalScrollProducts
            products={data.latestProducts.content}
            title="Últimos productos"
          />
        </Box>
      )}
      {data?.bestSells && (
        <Box paddingVertical="l">
          <HorizontalScrollProducts
            products={data?.bestSells}
            title="Los más vendidos"
          />
        </Box>
      )}
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
