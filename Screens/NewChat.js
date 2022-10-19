import * as React from "react";
import { View } from "../components/theme/Themed";
import MyText from "../components/MyText";
import MyInput from "../components/MyInput";
import { Alert, StyleSheet, View as DefaultView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setChatRooms } from "../src/features/chatRooms";
import {
  getUserByEmail,
  addUserToChatRoom,
  createNewChatRoom,
  getUserByID,
  listAllUsers,
} from "../src/utils/userOperations";
import { sendPushNotification } from "../src/utils/notifications";
import { useNavigation } from "@react-navigation/native";
import { resetAllUsers } from "../src/features/user";
import { FlashList } from "@shopify/flash-list";
import { Image } from "react-native";

export default function NewChat() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      const data = await listAllUsers()
      if(data){
        setUsers(data);
      }else{
        setUsers([
          {
            firstName:"No users found",
            id:"0"
          }
        ]);
      }
      setIsLoading(false);
    }
    handleSearch();
  }, []);
  
  

  // search for user by email

  // if user exists, create a chatroom

  // after create chatroom create userChatRooms
  // add current user to chatroom
  // add contact user to chatroom

  // set User Chatrooms to redux

  // if success! take user to chatroom with contact
  // send push notification to contact

  // if error show alert

  async function handleNewChat() {
    try {
      if (email.toLowerCase().trim() === user.email) {
        alert("That's your email 😅");
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
      await sendPushNotification(
        contact.notificationToken,
        "🚨 New conversation started!",
        `${
          user.firstName + " " + user.lastName
        } started a conversation with you`
      );
      setIsLoading(false);
      Alert.alert("Success!", "Conversation started successfully", [
        {
          text: "Let's chat!",
          onPress: () => navigation.goBack(),
          style: "default",
        },
      ]);
    } catch (e) {
      alert("something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <MyInput
        label="Search..."
        hiddenLabel
        onChangeText={setEmail}
        value={search}
      />
      <MyText type="body" style={styles.suggested}>
        Suggested
      </MyText>
      <FlashList
        data={users}
        renderItem={({ item }) => (
          <Users item={item} />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={50}
      />
    
      {/* <MyButton
        title={isLoading ? "Loading..." : "Start new chat"}
        onPress={handleNewChat}
        disabled={isLoading}
      /> */}
    </View>
  );
}

const Users = ({item}) => {
  return (
    <DefaultView style={styles.user}>
      <Image source={{ uri: item.profilePicture }} style={styles.image} />
      <MyText type="caption">{`${item.firstName} ${item.lastName}`}</MyText>
    </DefaultView>
  );  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  suggested: {
    borderTopColor: "lightgrey",
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


