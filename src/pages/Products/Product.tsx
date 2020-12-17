import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRODUCT } from "../../api/queries";
import {
  Product as IProduct,
  ProductVariables,
  Product_product_attributes,
} from "../../api/types/Product";
import { Box, Button, Tag, Text } from "../../components/atoms";
import { Star } from "../../components/icons";
import { useTheme } from "../../lib/theme";
import { ProductProps } from "../../navigation/Products";
import Quantity from "./Components/Quantity";

const { height } = Dimensions.get("window");

function formatAttributesState(
  attributes: (Product_product_attributes | null)[] | null | undefined
) {
  return attributes?.reduce(
    (prev, attr) => ({
      ...prev,
      [attr?.name]: null,
    }),
    {}
  );
}

const Product = ({ route }: ProductProps) => {
  const theme = useTheme();
  const { loading, data } = useQuery<IProduct, ProductVariables>(PRODUCT, {
    variables: { id: route.params.id },
  });
  const [qty, setQty] = useState(1);
  const [attrs, setAttrs] = useState({});
  return (
    <ScrollView>
      <Image
        source={{ uri: data?.product?.image }}
        style={{
          height: height / 2,
        }}
      />
      <Box padding="l" backgroundColor="white" marginBottom="m">
        <Text paddingBottom="l" variant="header4">
          {data?.product?.manufacturer}
        </Text>
        <Text>{data?.product?.shortDescription}</Text>
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
                      setAttrs((attrs) => ({
                        ...attrs,
                        [option.name]: value.id,
                      }))
                    }
                  >
                    <Box
                      marginRight="l"
                      backgroundColor={
                        attrs[option.name] === value?.id
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
        <Text color="greyscale4">{data?.product?.description}</Text>
      </Box>
      <Box padding="l" paddingTop="m" flexDirection="row">
        <Button label="Tallas" onPress={() => {}} flex={1} marginRight="l" />
        <Button label="Añadir a la cesta" onPress={() => {}} flex={1} />
      </Box>
    </ScrollView>
  );
};

export default Product;
