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

export default function PostCard(post) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const { author, content, createdAt, id, likedBy, numberOfLikes } = post;

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

  const sendReportEmail = async () => {
    const url = `mailto:${"cristiancmg127@gmail.com"}?subject=Report&body=${
      "This is an automatic email to the Inmigrants Reporting team. Please write any concerns above this paragraph and do not delete anything below. " +
      "User ID: " +
      user.id +
      "\n" +
      "Post ID: " +
      id
    }`;

    Linking.openURL(url);
    alert("Thank you for your report. We will review it as soon as possible.");
  };

  const handleReport = async () => {
    Alert.alert(
      "Report Post",
      "Are you sure you want to report this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Report",
          onPress: async () => {
            await sendReportEmail();
            dispatch(deletePostReducer(id));
            await deletePost(id);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
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
          <Pressable onPress={()=>navigation.navigate('Profile',{id:author.id})} style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: author?.profilePicture
                  ? author.profilePicture
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
              }}
              style={styles.image}
            />
            <View style={{ paddingLeft: 10 }}>
              <MyText style={{ fontWeight: "500" }}>{author?.firstName } {author?.lastName}</MyText>
              <MyText
                type="caption"
                style={{ color: Colors[theme].text + "70", fontWeight: "500" }}
              >
                {moment(createdAt).fromNow()}
              </MyText>
            </View>
          </Pressable>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={Colors[theme].text + "70"}
            onPress={handleReport}
          />
        </View>
        <MyText
          style={{ color: Colors[theme].text + "70", paddingVertical: 10 }}
        >
          {content}
        </MyText>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Pressable onPress={handleLike}>
            {likedBy !== null && likedBy.includes(user.id) ? (
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
              likedBy !== null && likedBy.includes(user.id)
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
            {numberOfLikes}
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
