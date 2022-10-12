import * as React from "react";
import { Text, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/colors";

export default function MyText({ children, type = "body", style }) {
  const theme = useColorScheme();
  return (
    <Text style={[styles[type], { color: Colors[theme].text }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
  },
  body: {
    fontSize: 18,
    color: Colors.dark,
  },
  caption: {
    fontSize: 14,
    color: Colors.dark,
  },
});
