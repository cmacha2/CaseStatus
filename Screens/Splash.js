import * as React from "react";
import { View,Animated,Dimensions} from "react-native";
import MyText from "../components/MyText";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useDispatch } from "react-redux"
import {setUser} from "../src/features/user"
import { getUser } from "../src/graphql/queries"
import { setChatRooms } from "../src/features/chatRooms";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/migrantUSA.png';
import lettersLogo from '../assets/lettermigrant.png';

export default function Splash({ setIsLoading }) {
  const dispatch = useDispatch();
  const edges = useSafeAreaInsets();
  const startAnimation = React.useRef(new Animated.Value(0)).current;
  const scaleLogo = React.useRef(new Animated.Value(1)).current;
  const scaleLetters = React.useRef(new Animated.Value(1)).current;
  const moveLogo = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveLetters = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const contentTransition = React.useRef(new Animated.Value(Dimensions.get('window').height)).current;

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


    React.useEffect(() => {
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        toValue: 0.3,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLetters,
                    {
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        toValue: {
                            x: Dimensions.get("window").width + 20,
                            y: Dimensions.get('window').height  - 25
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLetters,
                    {
                        toValue: {
                            x: 0,
                            y: Dimensions.get('window').height - 20
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 500);

    }, [])

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  }}>

          <Animated.View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
          }}>
              <Animated.Image source={Logo} style={{
                  width: Dimensions.get('window').width-170,
                  height: Dimensions.get('window').height / 5.6,
                  marginBottom: 20,
                  transform: [
                      { translateX: moveLogo.x },
                      { translateY: moveLogo.y },
                      { scale: scaleLogo },

                  ]
              }}></Animated.Image>

                  <Animated.Image source={lettersLogo} style={{
                   width: Dimensions.get('window').width-80,
                   height: 45,
                   marginBottom: 20,
                   transform: [
                      { translateX: moveLetters.x },
                      { translateY: moveLetters.y },
                      { scale: scaleLetters },

                  ]
              }}></Animated.Image>

          </Animated.View>

  </View>
  );
}