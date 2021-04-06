import { useQuery } from "@apollo/client";
import React from "react";
import { ScrollView } from "react-native";

import { ABOUT } from "../api/queries";
import { Box, Card, HtmlText, Text } from "../components/atoms";
import { About as IAbout } from "../api/types/About";

const About = () => {
  const { data } = useQuery<IAbout>(ABOUT);
  return (
    <ScrollView>
      <Card margin="m" padding="l">
        <HtmlText>{data?.page?.description}</HtmlText>
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
