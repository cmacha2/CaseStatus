import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import MyText from "../components/MyText";
import { useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { messagesByChatRoom } from "../src/graphql/queries";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/core";
import Colors from "../constants/colors";
import ChatRoomHeader from "../components/ChatRoomHeader";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { setChatRooms } from "../src/features/chatRooms";
import { useDispatch, useSelector } from "react-redux";
import { onCreateMessage } from "../src/graphql/subscriptions";
import { getUser } from "../graphqlCustom/getUser";
import { setUser } from "../src/features/user";

export default function ChatRoom() {
    const route = useRoute();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { chatRoomID, contactInfo } = route.params;
    const navigation = useNavigation();
    const theme = useColorScheme();
    const [messages, setMessages] = React.useState([]);
    const phoneHeight = useWindowDimensions();
  
    React.useEffect(() => {
      fetchMessages();
    }, []);
  
    React.useEffect(() => {
      API.graphql(
        graphqlOperation(onCreateMessage, { chatRoomID: chatRoomID })
      ).subscribe({
        next: ({ provider, value }) => {
          fetchMessages();
          fetchUser();
        },
        error: (e) => console.log(e),
      });
    }, []);
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => <ChatRoomHeader {...contactInfo} />,
      });
    }, []);
  
    async function fetchMessages() {
      try {
        const { data } = await API.graphql(
          graphqlOperation(messagesByChatRoom, {
            chatRoomID: chatRoomID,
            limit: 100,
            sortDirection: "DESC",
          })
        );
        setMessages(data.messagesByChatRoom.items);
      } catch (e) {
        console.log;
      }
    }
  
    async function fetchUser() {
      const { data } = await API.graphql(
        graphqlOperation(getUser, { id: user.id })
      );
      dispatch(
        setUser({
          id: data.getUser.id,
          firstName: data.getUser.firstName,
          lastName: data.getUser.lastName,
          profilePicture: data.getUser.profilePicture,
          backgroundPicture: data.getUser.backgroundPicture,
          email: data.getUser.email.toLowerCase(),
          status: data.getUser.status,
          notificationToken: data.getUser.notificationToken,
          latitude: data.getUser.latitude,
          longitude: data.getUser.longitude,
        })
      );
      if (data.getUser.chatRooms.items !== null) {
        dispatch(setChatRooms(data.getUser.chatRooms.items));
      }
    }
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={phoneHeight.height < 700 ? 60 : 90}
        style={{
          flex: 1,
          backgroundColor: Colors[theme].background,
        }}
      >
        <FlashList
        contentContainerStyle={{paddingBottom: 20}}
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          estimatedItemSize={200}
          inverted
        />
        <ChatInput
          chatRoomID={chatRoomID}
          contactToken={contactInfo.notificationToken ?? null}
        />
      </KeyboardAvoidingView>
    );
  }