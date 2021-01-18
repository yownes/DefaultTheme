import { Reference, useMutation, useQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { add } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

import {
  ADD_TO_CART,
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
} from "../../api/mutations";
import { PRODUCT } from "../../api/queries";
import { AddToCart, AddToCartVariables } from "../../api/types/AddToCart";
import {
  AddToFavourite,
  AddToFavouriteVariables,
} from "../../api/types/AddToFavourite";
import { Product as IProduct, ProductVariables } from "../../api/types/Product";
import {
  RemoveFavourite,
  RemoveFavouriteVariables,
} from "../../api/types/RemoveFavourite";
import { Box, Button, Tag, Text, HtmlText } from "../../components/atoms";
import { Favourite, FavouriteOutlined } from "../../components/icons";
import { Quantity } from "../../components/molecules";
import { useTheme } from "../../lib/theme";
import { ProductProps } from "../../navigation/Product";

const { height, width } = Dimensions.get("screen");

const Product = ({ route, navigation }: ProductProps) => {
  const theme = useTheme();
  const { index, id } = route.params;

  const [opacity, setOpacity] = useState(1);
  const { data } = useQuery<IProduct, ProductVariables>(PRODUCT, {
    variables: { id },
  });
  const [addToCart] = useMutation<AddToCart, AddToCartVariables>(ADD_TO_CART);
  const [addToFavourite] = useMutation<AddToFavourite, AddToFavouriteVariables>(
    ADD_TO_FAVOURITE,
    {
      variables: { id: parseInt(id) },
      update(cache, { data: addData }) {
        if (addData?.addToWishlist) {
          cache.modify({
            fields: {
              wishlist(existing: Reference[], { toReference }) {
                return [...existing, toReference({ ...data?.product })];
              },
            },
          });
        }
      },
    }
  );
  const [removeFavourite] = useMutation<
    RemoveFavourite,
    RemoveFavouriteVariables
  >(REMOVE_FAVOURITE, {
    variables: { id },
    update(cache, { data: removeData }) {
      if (removeData?.removeWishlist) {
        cache.modify({
          fields: {
            wishlist(existing: Reference[], { readField }) {
              return existing.filter(
                (productRef) => id !== readField("id", productRef)
              );
            },
          },
        });
        cache.modify({
          id: cache.identify({ ...data?.product }),
          fields: {
            inWishlist() {
              return false;
            },
          },
        });
      }
    },
  });
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState({});
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });
  const IMAGES: string[] = [
    data?.product?.image,
    ...(data?.product?.images?.map((img) => img?.image) ?? []),
  ]
    .filter(
      (str: string | null | undefined) => str !== null && str !== undefined
    )
    .map((img) => img as string);
  return (
    <ScrollView>
      <ScrollView
        contentOffset={{ x: width * (index ?? 0), y: 0 }}
        style={{ opacity }}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
      >
        {IMAGES.map((image, i) => (
          <Pressable
            key={i}
            onPress={() => {
              if (data?.product) {
                navigation.navigate("Images", {
                  product: data.product,
                  index: i,
                });
                setOpacity(0);
              }
            }}
          >
            <SharedElement id={`image.${i}.${data?.product?.id}`}>
              <Image
                source={{ uri: image }}
                style={{
                  height: height / 2,
                  width,
                }}
              />
            </SharedElement>
          </Pressable>
        ))}
      </ScrollView>
      <Box padding="l" backgroundColor="white" marginBottom="m">
        <Text paddingBottom="l" variant="header4">
          {data?.product?.manufacturer}
        </Text>
        <HtmlText>{data?.product?.shortDescription}</HtmlText>
        <Box flexDirection="row" paddingVertical="l">
          <Tag>{data?.product?.price}</Tag>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Quantity
            qty={qty}
            onChange={setQty}
            limit={data?.product?.stock ?? 0}
          />
          <TouchableOpacity
            onPress={() => {
              if (data?.product?.inWishlist) {
                removeFavourite();
              } else {
                addToFavourite();
              }
            }}
          >
            {data?.product?.inWishlist ? <Favourite /> : <FavouriteOutlined />}
          </TouchableOpacity>
        </Box>
      </Box>
      {(data?.product?.options?.length ?? 0) > 0 && (
        <Box paddingBottom="l" backgroundColor="white" marginBottom="m">
          {data?.product?.options?.map((option) => (
            <Box key={option?.name}>
              <Text
                variant="header4"
                paddingBottom="l"
                paddingLeft="l"
                marginTop="m"
              >
                {option?.name}
              </Text>
              <ScrollView
                horizontal
                style={{ paddingHorizontal: theme.spacing.l }}
              >
                {option?.values?.map((value) => (
                  <TouchableOpacity
                    key={value?.id}
                    onPress={() =>
                      setOptions((attrs) => ({
                        ...attrs,
                        [option.name]: value.id,
                      }))
                    }
                  >
                    <Box
                      marginRight="l"
                      backgroundColor={
                        options[option.name] === value?.id
                          ? "greyscale5"
                          : "greyscale2"
                      }
                      borderRadius={15}
                      padding="m"
                    >
                      <Text>{value?.name}</Text>
                    </Box>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Box>
          ))}
        </Box>
      )}
      <Box padding="l" paddingTop="m" backgroundColor="white" marginBottom="m">
        <Text variant="header4" paddingBottom="l">
          Descripción
        </Text>
        <HtmlText color="greyscale4">{data?.product?.description}</HtmlText>
      </Box>
      <Box padding="l" paddingTop="m" flexDirection="row">
        <Button label="Tallas" onPress={() => {}} flex={1} marginRight="l" />
        <Button
          label="Añadir a la cesta"
          onPress={() => {
            const opts = Object.entries(options).map(([id, value]) => ({
              id,
              value: value as string,
            }));

            addToCart({
              variables: { id: route.params.id, quantity: qty, options: opts },
            });
          }}
          flex={1}
        />
      </Box>
    </ScrollView>
  );
};

export default Product;
