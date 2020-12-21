import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

const style = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#9b9b9b",
    color: "#9b9b9b",
    padding: 10,
  },
});

const Input = (props: TextInputProps) => {
  return <TextInput style={style.input} {...props} />;
};

export default Input;
