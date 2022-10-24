import * as React from "react";
import MyText from "./MyText";
import { useSelector, useDispatch } from "react-redux";
import { Pressable, StyleSheet, Image, View } from "react-native";
import { API,graphqlOperation  } from "aws-amplify";
import * as ImagePicker from "expo-image-picker"
import {CLOUD_NAME,UPLOAD_PRESET} from "@env"
import { resetProfilePicture, setUser } from "../src/features/user";
import { updateUserPicture } from "../src/utils/userOperations";

const ProfilePicture = () => {
  const user = useSelector((state) => state.user);
  const { firstName, lastName, profilePicture , id } = user;

  const dispatch = useDispatch();


  const savePhotoCloudinary = async(data)=>{
    let apiUrl = `https://api.cloudinary.com/v1_1/cmacha2/image/upload/`

    try {
        const response = await fetch(apiUrl,{
            method:'POST',
            body:data,
        })
        const json = await response.json()
        await updateUserPicture(id,json.url)
        dispatch(resetProfilePicture(json.url))
        console.log('save to database', json.url)
    } catch (error) {
        console.log(error)
    }
  }

  const pickeImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:.2,
        base64:true
    })
    let base64Img = `data:image/jpg;base64,${result.base64}`
    const data = new FormData()
    data.append('file', base64Img)
    data.append('upload_preset', 'CaseNumber08')

    if(!result.cancelled){
        savePhotoCloudinary(data)
    }
  }


  return (
    <View style={styles.container}>
      <Pressable onPress={pickeImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }} style={styles.image} />
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
    paddingVertical:20,
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
