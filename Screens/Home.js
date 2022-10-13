import * as React from "react";
import { StatusBar, useColorScheme } from "react-native";
import ListTodos from "../components/ListTodos";
import MyText from "../components/MyText";

export default function Home() {
  const theme = useColorScheme();
  return (
    <React.Fragment>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <MyText type="title">Home</MyText>
    </React.Fragment>
  );
}
