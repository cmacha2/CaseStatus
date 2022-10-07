import "react-native-gesture-handler";
import * as React from "react";
import {
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  AppRegistry,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import HomeScreen from "./Screens/HomeScreen";

const pushDataStore = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@case_number", jsonValue);
  } catch (e) {
    // saving error
  }
};

// `Case Was Received and A Receipt Notice Was Sent
// On August 3, 2022, we received your Form I-765, Application for Employment Authorization, Receipt Number IOE0917114571, and sent you a receipt notice or acceptance notice. The notice describes how we will process your case. Please follow the instructions in the notice. If you move, go to www.uscis.gov/addresschange to give us your new mailing address.`



export default function App() {
  return <HomeScreen />;
}

