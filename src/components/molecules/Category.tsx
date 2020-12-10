import { useLinkProps, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Categories_categoriesList_content,
  Categories_categoriesList_content_categories,
} from "../../api/types/Categories";
import { Box, Chevron, Text } from "../atoms";

interface CategoryProps {
  category?: Categories_categoriesList_content;
}

interface ListItemProps {
  item?: Categories_categoriesList_content_categories;
}

export const LIST_ITEM_HEIGHT = 54;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  childContainer: {
    height: LIST_ITEM_HEIGHT,
  },
  chevron: {
    position: "absolute",
    right: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
});

const ListItem = ({ item }: ListItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Products", { category: item?.id });
      }}
    >
      <Box
        backgroundColor="white"
        justifyContent="center"
        alignItems="center"
        marginTop="s"
        style={styles.childContainer}
      >
        <Text variant="body" color="greyscale4">
          {item?.name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const Category = ({ category }: CategoryProps) => {
  const navigation = useNavigation();

  const open = useSharedValue(false);
  const aref = useAnimatedRef<View>();
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0)
  );
  const style = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));
  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: progress.value === 0 ? 8 : 0,
    borderBottomRightRadius: progress.value === 0 ? 8 : 0,
  }));
  if (!category) {
    return null;
  }
  const len = category?.categories?.length ?? -1;
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (len > 0) {
            if (height.value === 0) {
              runOnUI(() => {
                "worklet";
                height.value = measure(aref).height;
              })();
            }
            open.value = !open.value;
          } else {
            navigation.navigate("Products", { category: category.id });
          }
        }}
      >
        <Box
          padding="l"
          marginTop="m"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          flexDirection="row"
          style={headerStyle}
        >
          <Text variant="header3">{category.name}</Text>
          {len > 0 && (
            <View style={styles.chevron}>
              <Chevron {...{ progress }} />
            </View>
          )}
        </Box>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, style]}>
        <View ref={aref}>
          {len > 0 && (
            <ListItem
              item={{
                name: "~ Ver todos ~",
                id: category.id,
                __typename: "Category",
              }}
              key={"All"}
            />
          )}
          {category.categories?.map((cat, i) => (
            <ListItem item={cat!!} key={cat?.id} />
          ))}
        </View>
      </Animated.View>
    </>
  );
};

export default Category;
