import * as React from "react";
import MyText from "./MyText";
import { useSelector, useDispatch } from "react-redux";
import { Pressable, StyleSheet, Image, View } from "react-native";
import { color } from "react-native-reanimated";

function ProfileFallback({ firstName }) {
  return (
    <View style={styles.fallback}>
      <MyText style={styles.inicialLetter}>{firstName[0]}</MyText>
    </View>
  );
}

const ProfilePicture = () => {
  const user = useSelector((state) => state.user);
  const { firstName, lastName, profilePicture, id } = user;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("presss")}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <ProfileFallback firstName={firstName} />
        )}
      </Pressable>
      <MyText style={{ fontWeight: "bold" }}>
        {firstName} {lastName}
      </MyText>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  fallback: {
    backgroundColor: "lightcoral",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
  },
  image:{
    width:100,
    height:100,
    borderRadius:50,
    marginBottom:6
  },
  inicialLetter: {
    fontSize: 60,
    lineHeight: 100,
    textAlign: "center",
    color: "white",
  },

});
