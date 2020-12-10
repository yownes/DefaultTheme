import React from "react";
import { useQuery } from "@apollo/client";
import { Home as IHome } from "../api/types/Home";
import { Box, Button, Text, Loading } from "../components/atoms";
import { HOME } from "../api/queries";

const Home = ({ navigation }: any) => {
  const { loading, data } = useQuery<IHome>(HOME);
  if (loading) {
    return <Loading />;
  }
  return (
    <Box>
      <Text variant="header">{data?.home?.meta?.title}</Text>
      <Text variant="header2">{data?.home?.meta?.description}</Text>
      <Button
        onPress={() => navigation.navigate("Products")}
        label="Go to Products"
      />
      <Button
        onPress={() => navigation.navigate("About")}
        label="Go to About"
      />
    </Box>
  );
};

export default Home;
