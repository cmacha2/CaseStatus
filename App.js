import "react-native-gesture-handler";
import * as React from "react";
import {
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  AppRegistry,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

const pushDataStore = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@case_number", jsonValue);
  } catch (e) {
    // saving error
  }
};

// `Case Was Received and A Receipt Notice Was Sent
// On August 3, 2022, we received your Form I-765, Application for Employment Authorization, Receipt Number IOE0917114571, and sent you a receipt notice or acceptance notice. The notice describes how we will process your case. Please follow the instructions in the notice. If you move, go to www.uscis.gov/addresschange to give us your new mailing address.`

function HomeScreen() {
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["18%"], []);

  const handlerModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const data = {
    receiptNumber:'IOE0917114571',
    receiptDate:'Aug 3, 2022',
    titleCase:'Case was received and A Receipt Notice was Sent',
    lastUpdate:'64 days ago',
    typeForm:'I-765'

  }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <Text
          style={styles.textMyCases}
        >
          My Cases
        </Text>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.addCaseButton}
          onPress={handlerModal}
        >
          <AntDesign name="pluscircle" size={45} color="black" />
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 30 }}
          keyboardBlurBehavior="restore"
        >
            <View style={styles.containerAddCase}>
              <BottomSheetTextInput style={styles.input} />
              <TouchableOpacity>
                <AntDesign name="pluscircle" size={45} color="black" />
              </TouchableOpacity>
          </View>
          <TouchableOpacity
              style={{
                width: 25,
                borderRadius: 25,

              }}
              onPress={() => bottomSheetModalRef.current?.close()}
            >
              <AntDesign name="close" size={25} color="black" />
            </TouchableOpacity>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

export default function App() {
  return <HomeScreen />;
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#000511",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width:'75%',
    height:'35%',
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  textMyCases:{
    fontSize: 28,
    textAlign:"left",
    paddingLeft:15,
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    color: "#000000",
    fontFamily:"sans-serif-condensed"
  },
  addCaseButton:{
    width: 45,
    borderRadius: 25,
    position: "absolute",
    right: "5%",
    bottom: "3%",
  },
  containerAddCase: {
    height: "100%",
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems:'center'
  },
});
