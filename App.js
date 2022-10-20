import * as React from "react";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import AuthScreen from "./Screens/Auth";
import Root from "./navigation/Root";
import Splash from "./Screens/Splash";
import { store } from "./src/app/store";
import "react-native-gesture-handler";
import {Provider,useSelector,useDispatch} from "react-redux"
import { setUser, resetUser } from "./src/features/user"
import {setNotificationHandler} from "expo-notifications"

setNotificationHandler({
  handleNotification: async ()=> ({
    shouldShowAlert:true,
    shouldPlaySound:false,
    shouldSetBadge:false
  })
})


Amplify.configure(awsconfig);

export default function Wrapper(){
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

function App() {
  const user = useSelector((state)=>state.user)
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch()

  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        dispatch(setUser({
          id:data.payload.data.attributes.sub,
          firstName: data.payload.data.attributes.given_name,
          lastName: data.payload.data.attributes.family_name,
          profilePicture:null,
          backgroundPicture: null,
          email: data.payload.data.attributes.email,
          status:null,
          notificationToken:null
        }))
        console.log("user signed in");
        break;
      case "signOut":
          dispatch(resetUser())
        console.log("user signed out");
        break;
      default:
        break;
    }
  };

  Hub.listen("auth", listener);

  if (isLoading)
    return <Splash setIsLoading={setIsLoading} />;
  return user.email ? <Root user={user} /> : <AuthScreen />;
}
