import React from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { PROFILE } from "../../api/queries";
import { Box, Button, Card, Text } from "../../components/atoms";
import { ProfileProps } from "../../navigation/Profile";
import { Profile as IProfile } from "../../api/types/Profile";
import { Star } from "../../components/icons";
import Directions from "./Components/Directions";
import Payments from "./Components/Payments";

const Profile = ({ navigation }: ProfileProps) => {
  const { loading, data } = useQuery<IProfile>(PROFILE);
  if (!loading && data?.accountCheckLogged?.status === false) {
    navigation.replace("Login");
  }
  return (
    <ScrollView>
      <Box padding="m">
        <Card padding="l" justifyContent="center" alignItems="center">
          <Text variant="header">
            {data?.accountCheckLogged?.customer?.firstName}
          </Text>
          <Text paddingVertical="l">
            {data?.accountCheckLogged?.customer?.email}
          </Text>
          <Box
            flexDirection="row"
            justifyContent="space-evenly"
            style={{ width: "100%" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Favourites");
              }}
            >
              <Box alignItems="center">
                <Star color="dark" />
                <Text>Favoritos</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Orders");
              }}
            >
              <Box alignItems="center">
                <Star color="dark" />
                <Text>Pedidos</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Card>
        <Card padding="l" marginVertical="m">
          <Directions navigation={navigation} />
        </Card>
        <Card padding="l">
          <Payments navigation={navigation} />
        </Card>
      </Box>
    </ScrollView>
  );
};

export default Profile;
