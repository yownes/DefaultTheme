import React, { useCallback } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Box, Button, Card, Loading, Text } from "../../components/atoms";
import { ProfileProps } from "../../navigation/Profile";
import { Star } from "../../components/icons";
import Directions from "./Components/Directions";
import Payments from "./Components/Payments";
import { useAuth } from "../../components/organisms/AuthContext";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../../api/mutations";
import { Logout } from "../../api/types/Logout";

const Profile = ({ navigation }: ProfileProps) => {
  const { customer, logout: authLogout } = useAuth();
  const [logout] = useMutation<Logout>(LOGOUT);

  const handleLogout = useCallback(() => {
    logout().then(({ data }) => {
      if (data?.accountLogout?.status) {
        authLogout();
      }
    });
  }, [navigation, logout, authLogout]);

  return (
    <ScrollView>
      <Box padding="m">
        <Card padding="l" justifyContent="center" alignItems="center">
          <Text variant="header">{customer?.firstName}</Text>
          <Text paddingVertical="l">{customer?.email}</Text>
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
        <Button
          label="Desconectarse"
          marginVertical="l"
          onPress={handleLogout}
          backgroundColor="transparent"
          color="dark"
        />
      </Box>
    </ScrollView>
  );
};

export default Profile;
