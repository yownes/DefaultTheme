import React from "react";
import { Box, Button, Text } from "../../components/atoms";
import { ProfileProps } from "../../navigation/Profile";

const Profile = ({ navigation }: ProfileProps) => {
  return (
    <Box>
      <Text>Profile</Text>
      <Button
        onPress={() => navigation.navigate("AddDirection")}
        label="Add Direction"
      />
      <Button
        onPress={() => navigation.navigate("AddPaymentMethod")}
        label="Add Payment Method"
      />
      <Button onPress={() => navigation.navigate("Orders")} label="Orders" />
      <Button
        onPress={() => navigation.navigate("Favourites")}
        label="Favourites"
      />
      <Button onPress={() => navigation.navigate("Login")} label="Login" />
    </Box>
  );
};

export default Profile;
