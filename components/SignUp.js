import * as React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { AuthContext } from "../Context/AuthContext";
import { ScrollView } from "./theme/Themed";

export default function SignUp() {
  const { setAuthState, setEmail, setPassword, handleSignUp, setFirstName,setLastName,setConfirmPassword} =
    React.useContext(AuthContext);
  return (
    <ScrollView>
      <MyText type="title">Join the amazing community</MyText>
      <MyInput label={"First Name"} onChangeText={setFirstName}/>
      <MyInput label={"Last Name"} onChangeText={setLastName}/>
      <MyInput label="Email" onChangeText={setEmail} />
      <MyInput label="Password" onChangeText={setPassword} secureTextEntry />
      <MyInput label="Confirm Password" onChangeText={setConfirmPassword} secureTextEntry />
      <MyButton title="Join Me" onPress={handleSignUp} />
      <MyButton title="Go Back" type="secondary"  onPress={() => setAuthState("default")} />
    </ScrollView>
  );
}
