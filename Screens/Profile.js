import * as React from "react";
import MyText from "../components/MyText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphqlCustom/getUser";
import {
  Pressable,
  Dimensions,
  Image,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "../components/theme/Themed";
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector } from "react-redux";

export default function ContactProfile() {
  const [contact, setContact] = React.useState();
  const user = useSelector((state) => state.user);
  const theme = useColorScheme();
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    getContactInfo();
  }, []);

  async function getContactInfo() {
    if (route.params?.id) {
      const { data } = await API.graphql(
        graphqlOperation(getUser, { id: route.params.id })
      );
      setContact(data.getUser);
    } else {
      setContact(user);
    }
  }


  if (contact === undefined || contact === null) return;

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/005/232/190/non_2x/rectangle-neon-frame-sign-3d-render-illustration-free-photo.jpg",
          }}
          style={styles.imageBackground}
        />
        <View style={styles.containerProfilePic}>
          <Image
            source={{
              uri: contact.profilePicture
                ? contact.profilePicture
                : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            }}
            style={styles.image}
          />
        </View>
      </View>
      { (user.id === route?.params?.id || !route?.params?.id) ? (
        <EditProfileButton theme={theme} />
      )
    : <SendMessageButton theme={theme} />
    }
      <MyText
        style={{
          fontWeight: "600",
          textAlign: "center",
          marginTop: Dimensions.get("window").height < 700 ? 50 : 40,
        }}
      >
        {contact.firstName} {contact.lastName}
      </MyText>
      <MyText
        type="caption"
        style={{
          fontWeight: "600",
          textAlign: "center",
          color: Colors[theme].text + "70",
        }}
      >
        {contact.status
          ? '"' + contact.status + '"'
          : '"What do you see in my profile?"'}
      </MyText>

      <MyText
        type="caption"
        style={{
          fontWeight: "600",
          color: Colors[theme].text + "40",
          marginTop: 26,
        }}
      >
        INFORMATION
      </MyText>
      <InfoField label={"Email"} value={contact.email} theme={theme} />
      <InfoField
        label={"Member since"}
        value={moment(contact.createdAt).fromNow()}
        theme={theme}
      />
      <View
        style={{ height: Dimensions.get("window").height < 700 ? 30 : 80 }}
      />
      <InfoField
        label={"Report Contact"}
        theme={theme}
        onPress={() => alert("Report Contact")}
        danger
      />
      <InfoField
        label={"Delete Conversation"}
        theme={theme}
        onPress={() => alert("Delete Conversation")}
        danger
      />
    </ScrollView>
  );
}

function InfoField({ label, value, onPress, theme, danger }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.infoContainer,
        { borderBottomColor: Colors[theme].text + "80" },
      ]}
    >
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          color: danger ? Colors[theme].red : Colors[theme].text + "80",
          paddingRight: 10,
        }}
      >
        {label}
      </MyText>
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          paddingRight: 10,
        }}
      >
        {" "}
        {value}{" "}
      </MyText>
    </Pressable>
  );
}

const EditProfileButton = ({ theme, onPress }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.containerEditProfile}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <MyText style={styles.text}>Edit Profile</MyText>
          </Pressable>
        </View>
  )
}

const SendMessageButton = ({ theme, onPress, id}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.containerEditProfile}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Chats");
            }}
          >
            <MyText style={styles.text}>Send Message</MyText>
          </Pressable>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "35%",
    alignSelf: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
  },
  header: {
    height: Dimensions.get("window").height < 700 ? 120 : 170,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    // position: "absolute",
    // top: 0,
    // left: 0,
  },
  containerProfilePic: {
    position: "absolute",
    top: "81%",
    left: "5%",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  containerEditProfile: {
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: 10,
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 6,
    borderRadius: 15,
  },
});
