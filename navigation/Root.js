import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home"
import Profile from "../Screens/Profile";
import Onbording from "../Screens/Onbording";
import {Ionicons} from "@expo/vector-icons"
import Chats from "../Screens/Chats";
import NewPost from "../Screens/NewPost";
import Cases from "../Screens/Cases";
import Comments from "../Screens/Comments";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Root({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <BottomNavigator />
    </NavigationContainer>
  );
}

function BottomNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
          tabBarLabel:'Home',
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Cases"
        component={Cases}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
          tabBarLabel:'Cases',
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-chatbubbles" color={color} />,
          tabBarLabel:'Chats',
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-circle" color={color} />,
          tabBarLabel:'Settings'
        }}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props) {
  return <Ionicons size={28} {...props} />;
}


function HomeStack(){
  return (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home" component={Home} options={{
        headerShown:false
      }}/> 
      <Stack.Screen name="Onbording" component={Onbording} options={{
        presentation:'fullScreenModal',
        headerShown:false
      }}/>
      <Stack.Screen name="NewPost" component={NewPost} options={{presentation:'modal'}}/>
      <Stack.Screen name="Comments" component={Comments} options={{presentation:'modal'}}/>
    </Stack.Navigator>
  )
}

