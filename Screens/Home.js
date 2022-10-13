import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StatusBar, useColorScheme } from "react-native";
import ListTodos from "../components/ListTodos";
import MyText from "../components/MyText";
import { View } from "../components/theme/Themed";
import { API, graphqlOperation, } from "aws-amplify";
import { postsByDate } from "../graphql/queries";
import { FlashList } from "@shopify/flash-list";

export default function Home() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [posts,setPosts] = React.useState([])

  React.useEffect(() => {
    async function checkFirstLaunch() {
      const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
      if (!firstLaunch) navigation.navigate("Onbording");
    }
    checkFirstLaunch();
    fetchPost()
  }, []);

  async function fetchPost(){
    const {data} = await API.graphql(
      graphqlOperation(postsByDate,{
        type:'Posts',
        sortDirection:'DESC'
      })
    )
    setPosts(data.postsByDate.items)
    console.log(data)
  }

  return (
    <View style={{ flex: 1 }}>
      <MyText type="title">Home</MyText>
    </View>
  );
}
