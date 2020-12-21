import React from "react";
import { TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Input, Text } from "../../components/atoms";
import { LoginProps } from "../../navigation/Profile";

interface LoginState {
  mail: string;
  password: string;
}

const intialState: LoginState = {
  mail: "",
  password: "",
};

const Login = ({ navigation }: LoginProps) => {
  const { control, handleSubmit, errors } = useForm<LoginState>({
    defaultValues: intialState,
  });
  function onSubmit(data: LoginState) {
    console.log(data);
  }
  return (
    <Box padding="xl">
      <Box>
        <Text variant="header3" paddingBottom="xl">
          Inicio sesión
        </Text>
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
        <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => {}}>
          <Text variant="small" textAlign="right">
            ¿Has olvidado la contraseña?
          </Text>
        </TouchableOpacity>
        <Button
          marginTop="l"
          label="Iniciar sesión"
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          marginTop="l"
          backgroundColor="background"
          color="dark"
          label="Registrarme"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
