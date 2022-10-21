import * as React from "react";
import {
  Image,
  StyleSheet,
  useColorScheme,
  View,
  Linking,
  Alert,
  Pressable,
} from "react-native";
import MyText from "./MyText";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  incrementLikesMutation,
  decrementLikesMutation,
} from "../src/utils/postsOperations";
import {
  deletePostReducer,
  incrementLikesReducer,
  decrementLikesReducer,
} from "../src/features/posts";
import moment from "moment";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

export default function CardPostProfile({post, user}) {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const navigation = useNavigation();
  const { content, createdAt, id, likedBy, numberOfLikes } = post;

  const handleLike = async () => {
    const data = {
      postID: id,
      userID: user.id,
    };
    if (likedBy.includes(user.id)) {
      notificationAsync(NotificationFeedbackType.Error);
      dispatch(decrementLikesReducer(data));
      await decrementLikesMutation(id, likedBy, numberOfLikes, user.id);
    } else {
      notificationAsync(NotificationFeedbackType.Success);
      dispatch(incrementLikesReducer(data));
      await incrementLikesMutation(id, likedBy, numberOfLikes, user.id);
    }
  };


  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: Colors[theme].text + "80" },
      ]}
    >
      <View style={{ paddingHorizontal: 17 }}>
        <View style={styles.postHeader}>
          <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: user?.profilePicture
                  ? user.profilePicture
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
              }}
              style={styles.image}
            />
            <View style={{ paddingLeft: 10 }}>
              <MyText style={{ fontWeight: "500" }}>{user?.firstName } {user?.lastName}</MyText>
              <MyText
                type="caption"
                style={{ color: Colors[theme].text + "70", fontWeight: "500" }}
              >
                {moment(createdAt).fromNow()}
              </MyText>
            </View>
          </Pressable>
        </View>
        <MyText
          style={{ color: Colors[theme].text + "70", paddingVertical: 10 }}
        >
          {content}
        </MyText>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Pressable onPress={handleLike}>
            {(likedBy !== null)  && likedBy?.includes(user.id) ? (
              <AntDesign
                name="like1"
                size={21}
                color={Colors.light.tabIconSelected}
              />
            ) : (
              <AntDesign
                name="like2"
                size={21}
                color={Colors[theme].text + "50"}
              />
            )}
          </Pressable>
          <MyText
            type="caption"
            style={[
              likedBy !== null && likedBy?.includes(user.id)
                ? {
                    color: Colors.light.tabIconSelected,
                  }
                : { color: Colors[theme].text + "50" },
              { marginLeft: 5 },
            ]}
          >
            {numberOfLikes}
          </MyText>
          <FontAwesome5
            style={{ marginLeft: 12,
            paddingTop: 2 }}
            name="comment-alt"
            size={21}
            color={Colors[theme].text + "50"}
            onPress={() => navigation.navigate("Comments", { post })}
          />
          <MyText
            type="caption"
            style={{ marginLeft: 5, paddingBottom: 4, color: Colors[theme].text + "50" }}
          >
            {post?.comments?.items.length}
          </MyText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
