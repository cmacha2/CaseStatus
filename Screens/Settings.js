import * as React from "react";
import MyText from "../components/MyText";
import MyButton from "../components/MyButton";
import { Auth } from "aws-amplify";
import { ScrollView } from "../components/theme/Themed";
import { useSelector } from "react-redux";
import { StatusBar, useColorScheme } from "react-native";
import ProfilePicture from "../components/ProfilePicture";
import ProfileInformation from "../components/ProfileInformation";
import ProfilePermissions from "../components/ProfilePermissions";

export default function Settings() {
  const theme = useColorScheme();

  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfilePicture />
      <ProfileInformation />
      <ProfilePermissions />
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </ScrollView>
  );
}
