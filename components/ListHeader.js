import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MyText from "./MyText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { useSelector } from "react-redux";

export default function ListHeader({handleRefresh=null, title, iconName, handleNavigation }) {

  return (
      <View style={styles.container}>
        <MyText type="title">{title}</MyText>
        <View style={styles.topRight}>
          {
            handleRefresh && <Pressable onPress={handleRefresh}>
            <Ionicons
              size={30}
              style={{ marginBottom: -3,marginHorizontal: 15 }}
              name="refresh"
              color={Colors.light.tabIconSelected}
            />
          </Pressable>
          }
        <Pressable onPress={handleNavigation}>
          <Ionicons
            size={30}
            style={{ marginBottom: -3 }}
            name={iconName}
            color={Colors.light.tabIconSelected}
          />
        </Pressable>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 17,
      marginVertical: 23,
    },
    topRight: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });