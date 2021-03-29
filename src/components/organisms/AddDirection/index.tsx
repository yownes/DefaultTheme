import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Box, Text, Switch } from "../../atoms";
import { AccountAddressInput } from "../../../api/types/globalTypes";
import { InputWithErrors, SelectProvider } from "../../molecules";

import ListCountries from "./ListCountries";
import ListZones from "./ListZones";

interface AddDirectionProps {
  address?: AccountAddressInput;
}

const initialState: AccountAddressInput = {
  firstName: "",
  lastName: "",
  address1: "",
  countryId: null,
  zoneId: null,
  city: "",
};

const AddDirection = ({ address }: AddDirectionProps) => {
  const [isDefault, setIsDefault] = useState(true);
  const navigation = useNavigation();
  const { control, handleSubmit, errors, watch } = useForm<AccountAddressInput>(
    {
      defaultValues: address || initialState,
    }
  );
  useEffect(() => {
    navigation.setOptions({
      title: address ? "Editar Dirección" : "Añadir Dirección",
    });
  }, [address, navigation]);
  const countryId = watch("countryId");
  return (
    <SelectProvider>
      <Box padding="m">
        <Box marginBottom="m">
          <Controller
            control={control}
            name="firstName"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Nombre"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
                error={errors.firstName?.message}
              />
            )}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="lastName"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Apellidos"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
                error={errors.lastName?.message}
              />
            )}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="address1"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Dirección"
                onChangeText={onChange}
                value={value || ""}
                onBlur={onBlur}
                error={errors.address1?.message}
              />
            )}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="countryId"
            render={({ onChange, value }) => (
              <ListCountries defaultValue={value} onSelect={onChange} />
            )}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="zoneId"
            render={({ onChange, value }) => {
              return (
                <ListZones
                  countryId={countryId}
                  defaultValue={value}
                  onSelect={onChange}
                />
              );
            }}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="xl">
          <Controller
            control={control}
            name="city"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Ciudad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={errors.city?.message}
              />
            )}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Box flex={1}>
            <Text>Establecer como dirección de entrega predeterminada</Text>
          </Box>
          <Box flex={1} alignItems="flex-end">
            <Switch value={isDefault} onChange={setIsDefault} />
          </Box>
        </Box>
      </Box>
    </SelectProvider>
  );
};

export default AddDirection;
