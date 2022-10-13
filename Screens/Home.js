import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StatusBar, useColorScheme } from "react-native";
import ListTodos from "../components/ListTodos";
import MyText from "../components/MyText";
import { View } from "../components/theme/Themed";

export default function Home() {
  const theme = useColorScheme();
  const navigation = useNavigation()

  React.useEffect(()=>{
    async function checkFirstLaunch(){
      const firstLaunch = await AsyncStorage.getItem('@firstLaunch')
      if(!firstLaunch)navigation.navigate('Onbording')
    }
    checkFirstLaunch()
  
  },[])

  return (
    <View style={{flex:1}}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <MyText type="title">Home</MyText>
    </View>
  );
}
