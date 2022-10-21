import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, StatusBar, useColorScheme } from "react-native";
import { View } from "../components/theme/Themed";
import { API, graphqlOperation } from "aws-amplify";
import { postsByDate } from "../src/graphql/queries";
import { FlashList } from "@shopify/flash-list";
import ListHeader from "../components/ListHeader";
import PostCard from "../components/PostsCard";
import { setPostsReducer } from "../src/features/posts";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../src/utils/userOperations";
import MyButton from "../components/MyButton";
import { onCreateComment } from "../src/graphql/subscriptions";

export default function Home() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [nextToken, setNextToken] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      if (isActive) {
        async function checkFirstLaunch() {
          const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
          if (!firstLaunch) navigation.navigate("Onbording");
        }
        checkFirstLaunch();
        fetchPost();
      }
      return () => {
        isActive = false;
      };
    }, [])
  );


  async function fetchPost() {
    const { data } = await API.graphql(
      graphqlOperation(postsByDate, {
        type: "Post",
        sortDirection: "DESC",
        limit: 100,
      })
    );
    dispatch(setPostsReducer(data.postsByDate.items));
    setNextToken(data.postsByDate.nextToken);
    setLoading(false);
  }

  async function fetchMorePost() {
    if (nextToken) {
      setLoading(true);
      const { data } = await API.graphql(
        graphqlOperation(postsByDate, {
          type: "Post",
          sortDirection: "DESC",
          limit: 100,
          nextToken: nextToken,
        })
      );
      setPosts([...posts, ...data.postsByDate.items]);
      setNextToken(data.postsByDate.nextToken);
      if (data.postsByDate.nextToken == null) {
        alert("No more posts to load");
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1,paddingHorizontal:0}}>
      <FlashList
        data={posts}
        contentContainerStyle={Platform.OS === "ios" && { paddingVertical: 30 }}
        renderItem={({ item }) => <PostCard  {...item} />}
        estimatedItemSize={200}
        ListHeaderComponent={() => (
          <ListHeader
            flag
            title={"Posts"}
            iconName="add-circle-sharp"
            handleNavigation={() => navigation.navigate("NewPost")}
          />
        )}
        refreshing={loading}
        onRefresh={fetchPost}
        ListFooterComponent={() => {
          if(posts.length === 99){
          return <MyButton
            title={loading ? "loading" : "Load more"}
            disabled={loading || nextToken === null}
            onPress={fetchMorePost}
          />
          }
        }}
      />
    </View>
  );
}
