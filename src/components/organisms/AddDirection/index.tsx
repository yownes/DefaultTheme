import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Reference, useMutation } from "@apollo/client";

import { Box, Text, Switch } from "../../atoms";
import { InputWithErrors, SelectProvider } from "../../molecules";
import { AccountAddressInput } from "../../../api/types/globalTypes";
import { ADD_ADDRESS, EDIT_ADDRESS } from "../../../api/mutations";
import { AddAddress, AddAddressVariables } from "../../../api/types/AddAddress";
import {
  EditAddress,
  EditAddressVariables,
} from "../../../api/types/EditAddress";

import ListZones from "./ListZones";
import ListCountries from "./ListCountries";

interface AddDirectionProps {
  address?: AccountAddressInput & { id: string };
}

const initialState: AccountAddressInput = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  countryId: null,
  zoneId: null,
  city: "",
  zipcode: "",
};

const AddDirection = ({ address }: AddDirectionProps) => {
  const [isDefault, setIsDefault] = useState(true);
  const navigation = useNavigation();
  const [addAddress] = useMutation<AddAddress, AddAddressVariables>(
    ADD_ADDRESS,
    {
      update(cache, { data }) {
        if (data?.accountAddAddress?.id) {
          cache.modify({
            fields: {
              accountAddressList(existing: Reference[], { toReference }) {
                return [
                  ...existing,
                  toReference({ ...data.accountAddAddress }),
                ];
              },
            },
          });
          navigation.goBack();
        }
      },
    }
  );
  const [editAddress] = useMutation<EditAddress, EditAddressVariables>(
    EDIT_ADDRESS,
    {
      onCompleted({ accountEditAddress }) {
        if (accountEditAddress?.id) {
          navigation.goBack();
        }
      },
    }
  );
  const { control, handleSubmit, errors, watch } = useForm<AccountAddressInput>(
    {
      defaultValues: address || initialState,
    }
  );
  const onSubmit = useCallback(
    (data: AccountAddressInput) => {
      if (address) {
        editAddress({ variables: { id: address.id, address: data } });
      } else {
        addAddress({
          variables: {
            address: data,
          },
        });
      }
    },
    [addAddress, address, editAddress]
  );
  useEffect(() => {
    navigation.setOptions({
      title: address ? "Editar Dirección" : "Añadir Dirección",
      headerRight: () => (
        <Button
          onPress={handleSubmit(onSubmit)}
          title={address ? "Editar" : "Añadir"}
        />
      ),
    });
  }, [address, handleSubmit, navigation, onSubmit]);
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
                placeholder="Nombre (*)"
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
                placeholder="Apellidos (*)"
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
                placeholder="Dirección (*)"
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
            name="address2"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Dirección 2"
                onChangeText={onChange}
                value={value || ""}
                onBlur={onBlur}
                error={errors.address2?.message}
              />
            )}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="countryId"
            render={({ onChange, value }) => (
              <>
                <ListCountries defaultValue={value} onSelect={onChange} />
                {Boolean(errors.countryId?.message) && (
                  <Text color="danger">{errors.countryId?.message}</Text>
                )}
              </>
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
                <>
                  <ListZones
                    countryId={countryId}
                    defaultValue={value}
                    onSelect={onChange}
                  />
                  {Boolean(errors.zoneId?.message) && (
                    <Text color="danger">{errors.zoneId?.message}</Text>
                  )}
                </>
              );
            }}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="city"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Ciudad (*)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={errors.city?.message}
              />
            )}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Box>
        <Box marginBottom="xl">
          <Controller
            control={control}
            name="zipcode"
            render={({ onChange, value, onBlur }) => (
              <InputWithErrors
                placeholder="Código postal (*)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={errors.zipcode?.message}
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
