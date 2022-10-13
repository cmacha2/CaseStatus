import * as React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { Button, Pressable } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import Colors from "../constants/colors";

export default function SignIn() {
  const { setAuthState, setEmail, setPassword, handleSignIn, isLoading } =
    React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 30 }}>
        Login
      </MyText>
      <MyInput label="Email" onChangeText={setEmail} />
      <MyInput label="Password" secureTextEntry onChangeText={setPassword} />
      <Pressable onPress={() => setAuthState("forgotPassword")}>
        <MyText
          style={{
            color: Colors.light.tint,
            position: "absolute",
            right: 0,
            top: -15,
          }}
          type="caption"
        >
          Forgot Password ?
        </MyText>
      </Pressable>
      <MyButton
        title={isLoading ? "loading..." : "Sign In"}
        style={{ marginTop: 20, paddingHorizontal: 20 }}
        disabled={isLoading ? true : false}
        onPress={handleSignIn}
      />
      {/* <MyButton
        title="Sign In With Google"
        onPress={() => Auth.federatedSignIn()}
      /> */}
      <MyButton
        type="secondary"
        title="Go Back"
        onPress={() => setAuthState("default")}
      />
    </React.Fragment>
  );
}
