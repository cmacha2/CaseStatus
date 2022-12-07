import * as React from "react";
import {
  Image,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import MyText from "./MyText";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API } from "aws-amplify";
import { deleteUserChatRooms } from "../src/graphql/mutations";
import { removeChatRoom } from "../src/features/chatRooms";

export default function ChatRoomCard(chat) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { chatRoomID, chatRoom } = chat;
  const navigation = useNavigation();
  const { isSeenBy, participants, lastMessage } = chatRoom;
  const theme = useColorScheme();

  const contactInfo =
    participants.items?.length > 2
      ? {
          firstName: "User left",
        }
      : participants.items[0]?.user.id === user.id
      ? {
          id: participants.items[1]?.user.id,
          firstName: participants.items[1]?.user.firstName,
          lastName: participants.items[1]?.user.lastName,
          profilePicture: participants.items[1]?.user.profilePicture,
        }
      : {
          id: participants.items[0]?.user.id,
          firstName: participants.items[0]?.user.firstName,
          lastName: participants.items[0]?.user.lastName,
          profilePicture: participants.items[0]?.user.profilePicture,
        };
  const isSeenByCurrentUser = isSeenBy !== null && isSeenBy.includes(user.id);

  const handleDeleteChatRoom = async () => {
    Alert.alert(
      "Leave Chat Room",
      "Are you sure you want to leave this chat room?",
      [
        ,
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              console.log(
                await API.graphql({
                  query: deleteUserChatRooms,
                  variables: {
                    input: {
                      id: chat.id,
                    },
                  },
                })
              );

              dispatch(removeChatRoom(chat.id));
            } catch (e) {
              console.log(e);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Pressable
      style={[
        styles.container,
        { borderBottomColor: Colors[theme].text + "60" },
      ]}
      onPress={() =>
        navigation.navigate("ChatRoom", { contactInfo, chatRoomID })
      }
    >
      <View style={styles.containerWithPadding}>
        <View
          style={[
            styles.isSeen,
            isSeenByCurrentUser && { backgroundColor: "transparent" },
          ]}
        />
        <Image
          source={{
            uri: contactInfo.profilePicture
              ? contactInfo.profilePicture
              : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
          }}
          style={styles.image}
        />
        <View style={{ flexShrink: 1 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "baseline",
            }}
          >
            <MyText style={{ fontWeight: "500", fontSize: 16 }}>
              {contactInfo.firstName} {contactInfo.lastName}
            </MyText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MyText
                style={{
                  color: Colors[theme].text + "80",
                  fontWeight: "500",
                  fontSize: 12,
                  marginRight: 13,
                }}
              >
                {moment(lastMessage?.createdAt).fromNow()}
              </MyText>
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={Colors[theme].text + "80"}
                onPress={handleDeleteChatRoom}
              />
            </View>
          </View>
          <MyText
            type="caption"
            style={{
              color: Colors[theme].text + "80",
              fontSize: 14,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {chatRoom.lastMessage?.content.slice(0, 27)}
          </MyText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 77,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  containerWithPadding: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  isSeen: {
    width: 8,
    height: 8,
    backgroundColor: Colors.light.tabIconSelected,
    borderRadius: 4,
  },
});
