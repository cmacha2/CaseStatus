import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import Onbording from "../Screens/Onbording";
import { Ionicons } from "@expo/vector-icons";
import Chats from "../Screens/Chats";
import NewPost from "../Screens/NewPost";
import Cases from "../Screens/Cases";
import Comments from "../Screens/Comments";
import ChatRoom from "../Screens/ChatRoom";
import CaseDetails from "../Screens/CaseDetails";
import Settings from "../Screens/Settings";
import NewChat from "../Screens/NewChat";
import Notifications from "../Screens/Notifications";
import ShowPost from "../Screens/ShowPost";
import { useSelector } from "react-redux";

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
  const {notifications} = useSelector(state => state.notifications)
  const unSeenNotifications = notifications.filter(notification => notification.isSeseen === false)

  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CasesStack"
        component={CasesStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
          tabBarLabel: "Cases",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChatsStack"
        component={ChatsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-chatbubbles" color={color} />
          ),
          tabBarLabel: "Chats",
          headerShown: false,
        }}
      />
            <Tab.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-notifications" color={color} />
          ),
          tabBarLabel: "Notifications",
          headerShown: false,
          tabBarBadge: unSeenNotifications.length>0 ? unSeenNotifications.length : null,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle" color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />

    </Tab.Navigator>
  );
}


function TabBarIcon(props) {
  return <Ionicons size={28} {...props} />;
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Onbording"
        component={Onbording}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: "Chats",
          headerShown: false,
        }}
      />
      <Stack.Screen name="ShowPost" component={ShowPost} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}

function ChatsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          tabBarLabel: "Chats",
        }}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          tabBarLabel: "Chats",
          headerTitle: "New Chat",
        }}
      />
    </Stack.Navigator>
  );
}

function CasesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Cases"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="Cases"
        component={Cases}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CaseDetails"
        component={CaseDetails}
        options={{
          // tabBarLabel:'Cases',
          headerTitle: "Case Details",
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function NotificationsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Notifications" component={Notifications} options={{
          headerShown: false,
      }}/>
      <Stack.Screen name="ShowPost" component={ShowPost} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="Cases" component={Cases} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="CaseDetails"
        component={CaseDetails}
        options={{
          headerTitle: "Case Details",
        }}
      />
    </Stack.Navigator>
  );
}
