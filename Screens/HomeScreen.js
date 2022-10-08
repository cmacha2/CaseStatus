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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import ButtonAddCase from "../components/ButtonAddCase";
import ModalAddCase from "../components/ModalAddCase";
import NoCases from "../components/NoCases";
import CardCases from "../components/CardCases";
import { ScrollView } from "react-native-gesture-handler";

function HomeScreen() {
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["18%"], []);

  const handlerModal = () => {
    bottomSheetModalRef.current?.present();
  };



  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <Text style={styles.textMyCases}>My Cases</Text>
        <StatusBar style="auto" />
        <ButtonAddCase style={styles.addCaseButton} onPress={handlerModal} />
        <ModalAddCase bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} />
        <CardCases/>
        <CardCases/>
        <CardCases/>

      </View>
    </BottomSheetModalProvider>
  );
}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
export default HomeScreen;

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
 
  textMyCases: {
    fontSize: 28,
    textAlign: "left",
    paddingLeft: 15,
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    color: "#000000",
    fontFamily: "sans-serif-condensed",
  },
  addCaseButton: {
    width: 45,
    borderRadius: 25,
    position: "absolute",
    right: "5%",
    bottom: "3%",
  },
 
});
