import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import MyText from "../components/MyText";
import { Pressable, View, Alert } from "react-native";
import { StyleSheet } from "react-native";
import {
  addUserToChatRoom,
  createNewChatRoom,
  getUserByEmail,
  getUserByID,
} from "../src/utils/userOperations";
import { useDispatch, useSelector } from "react-redux";
import { sendPushNotification } from "../src/utils/notifications";
import { setChatRooms } from "../src/features/chatRooms";

export const SendMessageButton = ({ email }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleNewChat(email) {
    try {
      const contact = await getUserByEmail(email.toLowerCase().trim());
      if (contact === null) {
        alert(`This user does not receive messages`);
        return;
      }

      const newChatRoomID = await createNewChatRoom();
      await addUserToChatRoom(contact.id, newChatRoomID);

      await addUserToChatRoom(user.id, newChatRoomID);

      const refreshedUser = await getUserByID(user.id);
      if (refreshedUser.chatRooms !== undefined) {
        dispatch(setChatRooms(refreshedUser.chatRooms.items));
      }
      if (!contact?.notificationToken) {
        await sendPushNotification(
          contact?.notificationToken,
          "🚨 New conversation started!",
          `${
            user.firstName + " " + user.lastName
          } started a conversation with you`
        );
      }
      Alert.alert("Success!", "Conversation started successfully", [
        {
          text: "Let's chat!",
          style: "default",
        },
      ]);
    } catch (e) {
      alert("something went wrong");
    }
  }
  return (
    <View style={styles.containerEditProfile}>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await handleNewChat(email);
          navigation.navigate("Chats");
        }}
      >
        <MyText style={styles.text}>Send Message</MyText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
  },
});
