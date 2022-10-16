import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import React from "react";

const ButtonAddCase = ({style,onPress}) => {
 
  
  return (
    <TouchableOpacity style={style} onPress={onPress} >
      <AntDesign name="pluscircle" size={43} color="black" />
    </TouchableOpacity>
  );
};

export default ButtonAddCase;

const styles = StyleSheet.create({});
