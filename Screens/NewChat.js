import * as React from "react";
import { View } from "../components/theme/Themed";
import MyText from "../components/MyText";
import MyInput from "../components/MyInput";
import {
  Alert,
  Pressable,
  StyleSheet,
  useColorScheme,
  View as DefaultView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setChatRooms } from "../src/features/chatRooms";
import {
  getUserByEmail,
  addUserToChatRoom,
  createNewChatRoom,
  getUserByID,
  listAllUsers,
} from "../src/utils/userOperations";
import {
  createNotificationOnDB,
  sendPushNotification,
} from "../src/utils/notifications";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Image, ActivityIndicator } from "react-native";

export default function NewChat() {
  const theme = useColorScheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const { chatRooms } = useSelector((state) => state.chatRooms);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const data = await listAllUsers();
      if (data) {
        setUsers(data);
      } else {
        setUsers([
          {
            firstName: "No users found",
            id: "0",
          },
        ]);
      }
      setIsLoading(false);
    };
    getUsers();
  }, []);

  async function handleNewChat(email) {
    try {
      if (email.toLowerCase().trim() === user.email) {
        alert("You can't send messages to yourself 😅");
        return;
      }

      if (
        chatRooms.map((items) =>
          items.chatRoom.participants.items.find(
            (item) => item.user.email === email
          )
        ).length > 0
      ) {
        alert("You already have a chat with this user");
        return;
      }
      setIsLoading(true);
      const contact = await getUserByEmail(email.toLowerCase().trim());
      if (contact === null) {
        alert(`There is no user with email: ${email}`);
        setIsLoading(false);
        return;
      }
      const newChatRoomID = await createNewChatRoom();
      await addUserToChatRoom(contact.id, newChatRoomID);
      await addUserToChatRoom(user.id, newChatRoomID);

      const refreshedUser = await getUserByID(user.id);

      if (refreshedUser.chatRooms !== undefined) {
        dispatch(setChatRooms(refreshedUser.chatRooms.items));
      }

      const notificationData = await createNotificationOnDB(
        user.id,
        contact.id,
        "STARTED_CONVERSATION",
        newChatRoomID
      );
      await sendPushNotification(
        contact.notificationToken,
        "🚨 New conversation started!",
        `${
          user.firstName + " " + user.lastName
        } started a conversation with you`,
        notificationData
      );

      setIsLoading(false);
      navigation.navigate("ChatRoom", {
        chatRoomID: newChatRoomID,
        contactInfo: contact,
      });

    } catch (e) {
      alert("something went wrong 😅");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors[theme].text} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MyInput
        label="Search..."
        hiddenLabel
        onChangeText={setSearch}
        value={search}
      />
      <MyText
        type="body"
        style={[
          styles.suggested,
          {
            borderColor:
              theme === "dark"
                ? Colors.dark.text + "80"
                : Colors.light.text + "80",
          },
        ]}
      >
        Suggested
      </MyText>

      {!users.length ? (
        <MyText type="body" style={{ textAlign: "center", padding: 20 }}>
          No users found
        </MyText>
      ) : (
        <FlashList
          data={users?.filter((user) => {
            if (
              user.firstName.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
            ) {
              return user;
            }
          })}
          renderItem={({ item }) => (
            <Pressable
              style={styles.user}
              onPress={() => handleNewChat(item.email)}
            >
              <Image
                source={{
                  uri:
                    item.profilePicture ||
                    "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
                }}
                style={styles.image}
              />
              <MyText type="caption">{`${item.firstName} ${item.lastName}`}</MyText>
            </Pressable>
          )}
          keyExtractor={(item) => item?.id}
          estimatedItemSize={50}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  suggested: {
    borderTopWidth: 1,
    paddingTop: 13,
    fontWeight: "bold",
    paddingBottom: 13,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
});
