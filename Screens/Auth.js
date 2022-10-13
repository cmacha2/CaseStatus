import * as React from "react";
import { View } from "../components/theme/Themed";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ConfirmSignUp from "../components/ConfirmSignUp";
import { AuthProvider, AuthContext } from "../Context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Image,  useColorScheme } from "react-native";
import Colors  from "../constants/colors";
import DefaultAuth from "../components/DefaultAuth";
import ConfirmForgotPassword from "../components/ComfirmForgotPassword";
import ForgotPassword from "../components/ForgotPassword";


export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

function Auth() {
  const { authState } = React.useContext(AuthContext);
  const theme = useColorScheme();
  const image =
    theme === "dark"
      ? require("../assets/LogoDark.png")
      : require("../assets/LogoLight.png");
  console.log("authState", authState);
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: theme === 'dark' ? Colors.dark.background : Colors.light.background, paddingHorizontal:17 }}
    contentContainerStyle={{paddingVertical:90}}>
      <Image
        source={image}
        style={{ width: 178, height: 178, alignSelf: "center" }}
      />
      {authState === "default" && <DefaultAuth />}
      {authState === "signIn" && <SignIn />}
      {authState === "signUp" && <SignUp />}
      {authState === "forgotPassword" && <ForgotPassword />}
      {authState === "confirmForgotPassword" && <ConfirmForgotPassword />}
      {authState === "confirmSignUp" && <ConfirmSignUp />}
    </KeyboardAwareScrollView>
  );
}
