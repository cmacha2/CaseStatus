import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useColorScheme } from "react-native";
import Colors from "../constants/colors";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { createComment } from "../src/graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentsReducer } from "../src/features/posts";

const CommentInput = ({ postCommentsId }) => {
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.user);
  const [text, setText] = React.useState("");

  const pushComment = async () => {
    try {
      const { data } = await API.graphql({
        query: createComment,
        variables: {
          input: {
            content: text.trim(),
            postCommentsId: postCommentsId,
            userCommentsId: id,
          },
        },
      });
     const comment = data.createComment;
      dispatch(updateCommentsReducer(comment));
      console.log("comment send to post");
      setText("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.textInputBar}>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor: Colors[theme].text + "65",
            color: Colors[theme].text,
            backgroundColor: theme === "dark" ? "#000" : "#fff",
          },
        ]}
        placeholder="Type a message"
        placeholderTextColor="gray"
        scrollEnabled={true}
        textAlign="left"
        textAlignVertical="bottom"
        onChangeText={setText}
        defaultValue={text}
        multiline
      />
      <Pressable
        onPress={pushComment}
        disabled={text.trim().length === 0}
        style={styles.sendButtonWrapper}
      >
        <Image
          style={[
            styles.sendButton,
            text.trim().length < 1 ? { opacity: 0.3 } : { opacity: 1 },
          ]}
          source={
            theme === "light"
              ? require("../assets/send.png")
              : require("../assets/sendDark.png")
          }
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputBar: {
    width: "95%",
    flexDirection: "row",
    alignSelf: "center",
    flexGrow: 0,
  },
  textInput: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 8,
    paddingVertical: 8,
    paddingTop: 8,
    paddingRight: 40,
    flexGrow: 0,
    minWidth: "95%",
  },
  sendButtonWrapper: {
    position: "absolute",
    bottom: -4,
    right: -8,
    width: 44,
    height: 44,
    flexShrink: 0,
  },
  sendButton: {
    width: 28,
    height: 28,
  },
});

export default CommentInput;
