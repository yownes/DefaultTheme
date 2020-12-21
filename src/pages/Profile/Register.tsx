import React, { useReducer } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Input, Text } from "../../components/atoms";
import { RegisterProps } from "../../navigation/Profile";

const { width } = Dimensions.get("window");

interface RegisterState {
  mail: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const intialState: RegisterState = {
  mail: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const Register = ({ navigation }: RegisterProps) => {
  const { control, handleSubmit, errors } = useForm<RegisterState>({
    defaultValues: intialState,
  });
  function onSubmit(data: RegisterState) {
    console.log(data);
  }
  return (
    <Box padding="xl">
      <Box>
        <Text variant="header3" paddingBottom="xl">
          Registro
        </Text>
        <Box paddingBottom="l">
          <Controller
            control={control}
            name="name"
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nombre"
              />
            )}
            rules={{ required: true }}
          />
        </Box>
        <Box paddingBottom="l">
          <Controller
            control={control}
            name="mail"
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                placeholder="Email"
              />
            )}
            rules={{ required: true }}
          />
        </Box>
        <Box paddingBottom="l">
          <Controller
            control={control}
            name="password"
            render={({ onChange, onBlur, value }) => (
              <Input
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Contraseña"
              />
            )}
            rules={{ required: true }}
          />
        </Box>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ onChange, onBlur, value }) => (
            <Input
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirmar contraseña"
            />
          )}
          rules={{ required: true }}
        />
        <Button
          marginTop="l"
          label="Registrarme"
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          marginTop="l"
          backgroundColor="background"
          color="dark"
          label="Iniciar Sesión"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </Box>
    </Box>
  );
};

export default Register;
