import * as React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { AuthContext } from "../Context/AuthContext";
import { Auth } from "aws-amplify";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";

export default function DefaultAuth() {
  const { setAuthState, isLoading } = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 35 }}>
        The new way of freedom
      </MyText>
      <MyButton title="Create account" onPress={() => setAuthState("signUp")} />
      <MyButton
        type="secondary"
        title="Login"
        onPress={() => setAuthState("signIn")}
      />
      <MyText
        type="caption"
        style={{ textAlign: "center", marginVertical: 12 }}
      >
        -Or-
      </MyText>
      <Pressable onPress={() => Auth.federatedSignIn()} style={styles.google}>
        <Image
          source={require("../assets/googl.png")}
          style={styles.googleImage}
        />
        <Text style={styles.googleText}>
          {isLoading ? "Loading..." : "Sign In With Google"}
        </Text>
      </Pressable>
      {/* <MyButton
        title="Sign In With Apple"
        type="secondary"
        // onPress={() => Auth.federatedSignIn()}
      /> */}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  google: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  googleImage: { width: 24, height: 24, marginRight: 15 },
  googleText: { fontSize: 18, fontWeight: "500", color: "#00000090" },
});
