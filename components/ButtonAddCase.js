import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const ButtonAddCase = ({style,onPress}) => {
    console.log(style)
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <AntDesign name="pluscircle" size={45} color="black" />
    </TouchableOpacity>
  );
};

export default ButtonAddCase;

const styles = StyleSheet.create({});
