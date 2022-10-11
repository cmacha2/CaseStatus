import * as React from "react";
import { View } from "react-native";
import SignUp from "../components/SignUp";
import ConfirmSignUp from "../components/ConfirmSignUp";
import { AuthProvider, AuthContext } from "../Context/AuthContext";
import SignIn from "../components/SignIn";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

function Auth() {
  const { authState } = React.useContext(AuthContext);
  console.log("authState", authState);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {authState === "signIn" && <SignIn />}
      {authState === "signUp" && <SignUp />}
      {authState === "confirmSignUp" && <ConfirmSignUp />}
    </View>
  );
}
