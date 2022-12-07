import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
import { useColorScheme } from "react-native";
import Colors from "../constants/colors";

const ButtonAddCase = ({style,onPress}) => {
 const theme = useColorScheme();
  
  return (
    <TouchableOpacity style={style} onPress={onPress} >
      <AntDesign name="pluscircle" size={43} color={Colors[theme].text} />
    </TouchableOpacity>
  );
};

export default ButtonAddCase;

const styles = StyleSheet.create({});
