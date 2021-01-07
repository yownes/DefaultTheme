import React, { useReducer } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Input, Text } from "../../components/atoms";
import { RegisterProps } from "../../navigation/Profile";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../api/mutations";
import {
  Register as IRegister,
  RegisterVariables,
} from "../../api/types/Register";
import RegisterImage from "../../components/images/Register";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

interface RegisterState {
  mail: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const intialState: RegisterState = {
  mail: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
};

const Register = ({ navigation }: RegisterProps) => {
  const { control, handleSubmit, errors } = useForm<RegisterState>({
    defaultValues: intialState,
  });
  const [register] = useMutation<IRegister, RegisterVariables>(REGISTER);
  function onSubmit(data: RegisterState) {
    register({
      variables: {
        customer: {
          email: data.mail,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
        },
      },
    });
  }
  return (
    <ScrollView>
      <Box padding="xl" paddingTop="s">
        <Box>
          <RegisterImage />
          <Text variant="header3" paddingBottom="xl">
            Registro
          </Text>
          <Box paddingBottom="l">
            <Controller
              control={control}
              name="firstName"
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
              name="lastName"
              render={({ onChange, onBlur, value }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Apellidos"
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
    </ScrollView>
  );
};

export default Register;
