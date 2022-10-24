import * as React from "react";
import MyText from "../components/MyText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../src/graphql/queries";
import {
  Pressable,
  Dimensions,
  Image,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Colors from "../constants/colors";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { SendMessageButton } from "../components/SendMessageButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlashList } from "@shopify/flash-list";
import CardPostProfile from "../components/CardPostsProfile";
import { updateUserPicture } from "../src/utils/userOperations";
import { resetProfilePicture } from "../src/features/user";
import {CLOUD_NAME,UPLOAD_PRESET} from "@env"
import * as ImagePicker from "expo-image-picker"

export default function ContactProfile() {
  const [contact, setContact] = React.useState([]);
  const user = useSelector((state) => state.user);
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const route = useRoute();

  React.useEffect(() => {
    getContactInfo();
  }, [user]);

  async function getContactInfo() {
    setLoading(true);
    if (route.params?.id) {
      const { data } = await API.graphql(
        graphqlOperation(getUser, { id: route.params.id })
      );
      setContact(data.getUser);
    } else {
      setContact(user);
    }
    setLoading(false);
  }

  const savePhotoCloudinary = async(data)=>{
    let apiUrl = `https://api.cloudinary.com/v1_1/cmacha2/image/upload/`

    try {
        const response = await fetch(apiUrl,{
            method:'POST',
            body:data,
        })
        const json = await response.json()
        await updateUserPicture(contact.id,json.url)
        dispatch(resetProfilePicture(json.url))
        setContact({...contact, profilePicture:json.url})
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
    data.append('upload_preset','CaseNumber08')

    if(!result.cancelled){
        savePhotoCloudinary(data)
    }
  }



  if (contact === undefined || contact === null) return;

  return (
    <KeyboardAwareScrollView style={{
      backgroundColor: Colors[theme].background,
      flex: 1,
    }}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/cmacha2/image/upload/v1666531114/3D-wall-2_cois05.jpg",
          }}
          style={styles.imageBackground}
        />
        <Pressable onPress={(!route.params?.id || route.params?.id === user.id) ? pickeImage : null} style={styles.containerProfilePic}>
          <Image
            source={{
              uri: contact.profilePicture
                ? contact.profilePicture
                : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            }}
            style={styles.image}
          />
        </Pressable>
      </View>
      { (user.id === route?.params?.id || !route?.params?.id) ? (
        <EditProfileButton />
      )
    : <SendMessageButton email={contact.email} theme={theme} />
    }
      <MyText
        style={{
          fontWeight: "600",
          paddingLeft: 12,
          marginTop: Dimensions.get("window").height < 700 ? 20 : 13,
        }}
      >
        {contact.firstName} {contact.lastName}
      </MyText>
      <MyText
        type="caption"
        style={{
          fontWeight: "600",
          paddingLeft: 12,
          color: Colors[theme].text + "50",
        }}
      >
        {contact.createdAt
          ? `Member since ${moment(contact.createdAt).fromNow()}`
          : `Member since a long time ago`}
      </MyText>
      <MyText
        type="caption"
        style={{
          fontWeight: "400",
          paddingLeft: 12,
          color: Colors[theme].text,
        }}
      >
        {contact.status
          ? '"' + contact.status + '"'
          : '"What do you see in my profile?"'}
      </MyText>

      <MyText
        type="caption"
        style={{
          fontWeight: "600",
          color: Colors[theme].text + "40",
          marginTop: 16,
          borderBottomColor: Colors[theme].text + "40",
          borderBottomWidth: 1.5,
          paddingBottom: 10,
          marginHorizontal: 12,
        }}
      >
        POSTS
      </MyText>
      
      <ProfilePosts contact={contact} getContactInfo={getContactInfo} loading={loading} />
    </KeyboardAwareScrollView>
  );
}

const ProfilePosts = ({ contact, getContactInfo ,loading }) => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <View style={{ height:'100%' }}>
      <FlashList
        data={posts.filter((post) => post.userPostsId === contact.id)}
        contentContainerStyle={Platform.OS === "ios" && { paddingVertical: 30 }}
        renderItem={({ item }) => <CardPostProfile post={item} user={contact}/>}
        estimatedItemSize={200}
        refreshing={loading}
        onRefresh={getContactInfo}
      />
    </View>
  )
}


const EditProfileButton = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.containerEditProfile}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <MyText style={styles.text}>Edit Profile</MyText>
          </Pressable>
        </View>
  )
}



const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
  },
  header: {
    height: Dimensions.get("window").height < 700 ? 120 : 170,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    // position: "absolute",
    // top: 0,
    // left: 0,
  },
  containerProfilePic: {
    position: "absolute",
    top: "81%",
    left: "5%",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  containerEditProfile: {
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: 10,
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 6,
    borderRadius: 15,
  },
});
