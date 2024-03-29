import React, { useCallback, useEffect, useState } from "react";
import { Button as NativeButton } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Reference, useMutation } from "@apollo/client";

import { Box, Text, Switch, Button } from "../../atoms";
import { Confirm, InputWithErrors, SelectProvider } from "../../molecules";
import { AccountAddressInput } from "../../../api/types/globalTypes";
import {
  ADD_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
} from "../../../api/mutations";
import {
  AddAddress,
  AddAddressVariables,
  AddAddress_accountAddAddress,
} from "../../../api/types/AddAddress";
import {
  EditAddress,
  EditAddressVariables,
} from "../../../api/types/EditAddress";
import {
  DeleteAddress,
  DeleteAddressVariables,
} from "../../../api/types/DeleteAddress";

import ListZones from "./ListZones";
import ListCountries from "./ListCountries";

interface AddDirectionProps {
  address?: AccountAddressInput & { id: string };
  onSuccess?: (address?: AddAddress_accountAddAddress) => void;
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

const AddDirection = ({ address, onSuccess }: AddDirectionProps) => {
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
                const addressRef = toReference({ ...data.accountAddAddress });

                return [...existing, addressRef];
              },
            },
          });
          onSuccess?.(data.accountAddAddress);
        }
      },
    }
  );
  const [editAddress] = useMutation<EditAddress, EditAddressVariables>(
    EDIT_ADDRESS,
    {
      onCompleted({ accountEditAddress }) {
        if (accountEditAddress?.id) {
          onSuccess?.(accountEditAddress);
        }
      },
    }
  );
  const [deleteAddress] = useMutation<DeleteAddress, DeleteAddressVariables>(
    DELETE_ADDRESS,
    {
      onCompleted({ accountRemoveAddress }) {
        if (accountRemoveAddress) {
          onSuccess?.();
        }
      },
      update(cache, { data }) {
        if (data?.accountRemoveAddress) {
          cache.modify({
            fields: {
              accountAddressList(existing: Reference[], { toReference }) {
                const all = data.accountRemoveAddress?.map((a) =>
                  toReference({ ...a })
                );
                return all;
              },
            },
          });
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
        <NativeButton
          onPress={handleSubmit(onSubmit)}
          title={address ? "Editar" : "Añadir"}
        />
      ),
    });
  }, [address, handleSubmit, navigation, onSubmit]);
  const countryId = watch("countryId");
  return (
    <SelectProvider>
      <Box padding="m" flex={1}>
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
        {address?.id && (
          <Box flex={1} justifyContent="flex-end">
            <Confirm
              title="¿Realmete deseas eliminar esta dirección?"
              onConfirm={() => {
                deleteAddress({
                  variables: {
                    id: address.id,
                  },
                });
              }}
            >
              <Button
                label="Eliminar"
                backgroundColor="transparent"
                color="danger"
              />
            </Confirm>
          </Box>
        )}
      </Box>
    </SelectProvider>
  );
};

export default AddDirection;
