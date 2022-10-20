import * as React from "react";
import { View } from "react-native";
import MyText from "../components/MyText";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useDispatch } from "react-redux"
import {setUser} from "../src/features/user"
import { getUser } from "../src/graphql/queries"
import { setChatRooms } from "../src/features/chatRooms";

export default function Splash({ setIsLoading }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser();
        const { data } = await API.graphql(
          graphqlOperation(getUser, { id: attributes.sub })
        );

        dispatch(
          setUser({
            id: attributes.sub,
            firstName: data.getUser.firstName,
            lastName: data.getUser.lastName,
            profilePicture: data.getUser.profilePicture,
            backgroundPicture: data.getUser.backgroundPicture,
            email: attributes.email.toLowerCase(),
            status: data.getUser.status,
            notificationToken: data.getUser.notificationToken,
            latitude:data.getUser.latitude,
            longitude:data.getUser.longitude,
            cases: data.getUser.cases.items,
          })
        );
        if(data.getUser.chatRooms.items !== null){
          dispatch(setChatRooms(data.getUser.chatRooms.items));
          }
        dispatch(setChatRooms(data.getUser.chatRooms.items));
        setIsLoading(false);
        // console.log(attributes);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MyText type="title">🕰</MyText>
      <MyText type="title">Loading...</MyText>
    </View>
  );
}