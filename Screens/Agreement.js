import * as React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View as DefaultView,
} from "react-native";
import { View } from "../components/themed/Themed";
import MyText from "../components/MyText";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Colors from '../constants/colors';
import { Entypo } from "@expo/vector-icons";

export default function Agreement() {
  const [selected, setSelected] = React.useState(false);
  const navigation = useNavigation();

  async function handleOnContinue() {
    await AsyncStorage.setItem("@firstLaunch", "true");
    navigation.navigate("Onboarding");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <DefaultView>
        <MyText type="title" style={[styles.title, { marginBottom: 30 }]}>
          Only Chats Agreement
        </MyText>
        <MyText type="caption" style={{ fontWeight: "bold" }}>
          IMPORTANT - PLEASE READ CAREFULLY
        </MyText>
        <ScrollView
          style={{
            height: "40%",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          {appFeatures.map((feature, index) => (
            <View key={index} style={styles.itemContainer}>
              <DefaultView style={styles.textWrapper}>
                <MyText type="caption" style={{ fontWeight: "bold" }}>
                  {feature.title}
                </MyText>
                <MyText type="caption">{feature.description}</MyText>
              </DefaultView>
            </View>
          ))}
        </ScrollView>
        <Pressable
          onPress={() => setSelected(!selected)}
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {selected ? (
            <AntDesign
              name="checkcircle"
              size={24}
              color={Colors.light.tabIconSelected}
            />
          ) : (
            <Entypo name="circle" size={24} color={"gray"} />
          )}
          <MyText style={{ marginLeft: 10 }}>Accept Terms</MyText>
        </Pressable>
        <MyButton
          style={{ marginTop: 50, opacity: selected ? 1 : 0.2 }}
          title="Continue"
          disabled={!selected}
          onPress={handleOnContinue}
        />
      </DefaultView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  textWrapper: {
    flexShrink: 1,
  },
  icon: {
    width: 58,
    height: 58,
    marginRight: 13,
  },
  itemContainer: {
    marginVertical: 13,
  },
});

const appFeatures = [
  {
    icon: require("../../assets/post.png"),
    title: "Safety: Your Interactions with Other Members.",
    description:
      "You agree to treat other users in a courteous and respectful manner, both on and off our application and to be respectful when communicating with our team",
  },
  {
    icon: require("../../assets/message.png"),
    title: "Other Members’ Content.",
    description:
      "Although Only Chats reserves the right to review and remove content that violates this Agreement, such content is the sole responsibility of the member who posts it, and Only Chats cannot guarantee that all content will comply with this Agreement. If you see content on the application that violates this Agreement, please report it within the application or via email to codewithbeto.dev@gmail.com.",
  },
  {
    icon: require("../../assets/bell.png"),
    title: "Objectionable Content.",
    description:
      "There is no tolerance for objectionable content or abusive users. Objectionable content includes but isn't exclusive to bullying, harassment, threatening, hate speech or symbols, sharing inapporpirate things, racism, and others. The violations of this section can cause the immediate and permanent removal of the user from the app without notice.",
  },
];