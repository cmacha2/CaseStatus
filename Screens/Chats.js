import { StyleSheet, Platform } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View } from "../components/theme/Themed";
import ListHeader from "../components/ListHeader";
import { FlashList } from "@shopify/flash-list";
import ChatRoomCard from "../components/ChatRoomCard";

const Chats = () => {
  const { chatRooms } = useSelector((state) => state.chatRooms);
  return (
    <View style={styles.container}>
      <FlashList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomCard {...item} /> }
        contentContainerStyle={Platform.OS === "ios" && { paddingVertical: 30 }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ListHeader
            title="Chats"
            iconName="add-circle-sharp"
            handleNavigation={() => {}}
          />
        }
        estimatedItemSize={100}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
