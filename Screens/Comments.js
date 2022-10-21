import { StyleSheet, Text, View as DefaultView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "react-native";
import moment from "moment";
import { View } from "../components/theme/Themed";
import MyText from "../components/MyText";
import Colors from "../constants/colors";
import { useColorScheme } from "react-native";
import CommentInput from "../components/CommentInput";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import { deleteCommentReducer} from "../src/features/posts";
import { deleteComment } from "../src/utils/commentsOperations";
import { Alert } from "react-native";

const Comments = () => {
  const theme = useColorScheme();
  const route = useRoute();
  const { comments } = useSelector((state) => state.posts);
  const { postID } = route.params;

  return (
    <DefaultView style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <FlashList
        data={comments}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => <CardComment comment={item} postID={postID}/>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
      />
      <CommentInput postCommentsId={postID} />
    </DefaultView>
  );
};

export default Comments;

const CardComment = ({postID, comment }) => {
  const user = useSelector((state) => state.user);
  const theme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const sendReportEmail = async () => {
    const url = `mailto:${"cristiancmg127@gmail.com"}?subject=Report&body=${
      "This is an automatic email to the Inmigrants Reporting team. Please write any concerns above this paragraph and do not delete anything below. " +
      "User ID: " +
      comment.user.id +
      "\n" +
      "Post ID: " +
      postID
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
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const removeComment = () => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteComment(comment.id);
            dispatch(deleteCommentReducer(comment.id));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }


  return (
    <>
      <DefaultView
        style={[
          styles.containerCard,
          {
            borderColor: Colors[theme].text + "20",
          },
        ]}
      >
        <DefaultView style={styles.header}>
          <Pressable
            onPress={() =>
              navigation.navigate("Profile", { id: comment.user.id })
            }
          >
            <Image
              source={{ uri: comment.user.profilePicture }}
              style={styles.image}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Profile", { id: comment.user.id })
            }
            style={styles.content}
          >
            <MyText type="body" style={styles.name}>
              {comment.user.firstName + " " + comment.user.lastName}
            </MyText>
            <MyText style={{ color: "gray", fontSize: 12 }}>
              {moment(comment.createdAt).fromNow()}
            </MyText>
          </Pressable>
        </DefaultView>
        <MyText type="caption" style={styles.comment}>
          {comment.content}
        </MyText>
      </DefaultView>
      <DefaultView style={styles.options}>
        <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color={Colors[theme].text + "70"}
          onPress={comment.user.id===user.id?removeComment:handleReport}
        />
      </DefaultView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    // backgroundColor: "red",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
  },
  comment: {
    marginTop: 5,
    fontSize: 14,
  },
  containerCard: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
  },
  options: {
    position: "absolute",
    right: 10,
    top: 20    
  },
});
