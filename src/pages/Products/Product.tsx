import { useMutation, useQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

import { ADD_TO_CART } from "../../api/mutations";
import { PRODUCT } from "../../api/queries";
import { AddToCart, AddToCartVariables } from "../../api/types/AddToCart";
import { Product as IProduct, ProductVariables } from "../../api/types/Product";
import { Box, Button, Tag, Text, HtmlText } from "../../components/atoms";
import { Star } from "../../components/icons";
import { Quantity } from "../../components/molecules";
import { useTheme } from "../../lib/theme";
import { ProductProps } from "../../navigation/Root";

const { height } = Dimensions.get("screen");

const Product = ({ route, navigation }: ProductProps) => {
  const theme = useTheme();
  const [opacity, setOpacity] = useState(1);
  const { loading, data } = useQuery<IProduct, ProductVariables>(PRODUCT, {
    variables: { id: route.params.id },
  });
  const [addToCart] = useMutation<AddToCart, AddToCartVariables>(ADD_TO_CART);
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState({});
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });
  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          if (data?.product) {
            navigation.navigate("Images", {
              product: data.product,
            });
            setOpacity(0);
          }
        }}
      >
        <SharedElement id={`image.${data?.product?.id}`}>
          <Image
            source={{ uri: data?.product?.image }}
            style={{
              height: height / 2,
              opacity,
            }}
          />
        </SharedElement>
      </Pressable>
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
          <Star color="dark" />
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
