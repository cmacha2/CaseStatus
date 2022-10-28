import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Logo....
import Logo from '../assets/migrantUSA.png';
import lettersLogo from '../assets/lettermigrant.png';
import Root from "../navigation/Root"


export default function SplashScreen() {

    // SafeArea Value...
    const edges = useSafeAreaInsets();

    console.log(edges)

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down Both logo and Letters...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    console.log(scaleLogo)
    const scaleLetters = useRef(new Animated.Value(1)).current;

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveLetters = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Animation Done....
    useEffect(() => {

        // Starting Animation after 500ms....
        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.35
                        toValue: 0.3,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLetters,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right Most...
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
                        // Moving to Right Most...
                        toValue: {
                            x: 0,
                            // Since image size is 100...
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

    // Going to Move Up like Nav Bar...
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
                        width: Dimensions.get('window').width-150,
                        height: Dimensions.get('window').height / 5,
                        marginBottom: 20,
                        transform: [
                            { translateX: moveLogo.x },
                            { translateY: moveLogo.y },
                            { scale: scaleLogo },

                        ]
                    }}></Animated.Image>

                        <Animated.Image source={lettersLogo} style={{
                         width: Dimensions.get('window').width-150,
                         height: 35,
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