import { useQuery } from "@apollo/client";
import React from "react";
import { ABOUT } from "../api/queries";
import { Box, Card, Text } from "../components/atoms";
import { About as IAbout } from "../api/types/About";
import HTML from "react-native-render-html";
import { ScrollView } from "react-native";

interface AboutProps {}

const About = ({}: AboutProps) => {
  const { loading, data } = useQuery<IAbout>(ABOUT);
  return (
    <ScrollView>
      <Card margin="m" padding="l">
        <HTML source={{ html: data?.page?.description || "" }} />
        <Box marginTop="xl" alignItems="center">
          <Text>{data?.contact?.telephone}</Text>
          <Text padding="xl" textAlign="center">
            {data?.contact?.email}
          </Text>
          <Text>{data?.contact?.address}</Text>
        </Box>
      </Card>
    </ScrollView>
  );
};

export default About;
