import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  Children,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { TouchableOpacity } from "react-native";

import { Box, Input, Text } from "../atoms";

interface SelectProps {
  children: React.ReactNode;
  placeholder: string;
  defaultValue?: string;
  onChange: (value?: string | null) => void;
  formatSelectedValue?: (value?: string | null) => string;
}

interface SelectItemProps {
  id: string;
  title: string;
}

const SelectContext = createContext<{
  selected: string | undefined;
  setSelected: (value: string) => void;
}>({
  selected: undefined,
  setSelected: () => null,
});

const snapPoints = ["80%"];

const Select = ({
  children,
  placeholder,
  onChange,
  defaultValue,
  formatSelectedValue = (value) => value || "",
}: SelectProps) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<string | null>(defaultValue || null);

  useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          modalRef.current?.present();
        }}
      >
        <Input
          value={selected ? formatSelectedValue(selected) : placeholder}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <BottomSheetModal
        index={0}
        ref={modalRef}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
      >
        <BottomSheetScrollView>
          <Box padding="l">
            <Text variant="header" marginBottom="m">
              {placeholder}
            </Text>
            <SelectContext.Provider value={{ selected, setSelected }}>
              {Children.map(children, (child, index) => (
                <PrivateItem
                  {...(child.props as SelectItemProps)}
                  key={index}
                />
              ))}
            </SelectContext.Provider>
          </Box>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const PrivateItem = ({ id, title }: SelectItemProps) => {
  const { setSelected, selected } = useContext(SelectContext);
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(id);
      }}
    >
      <Box
        padding="m"
        borderRadius={5}
        backgroundColor={selected === id ? "greyscale2" : undefined}
      >
        <Text variant="header2">{title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export const Item = (_props: SelectItemProps) => {
  throw new Error("Child must be in Parent");
};

export const SelectProvider = BottomSheetModalProvider;

export default Select;
