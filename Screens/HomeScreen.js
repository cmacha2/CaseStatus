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
  ScrollView,
  SafeAreaView,
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
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function HomeScreen() {
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["18%"], []);
  const [data,setData]=React.useState([])
  const handlerModal = () => {
    bottomSheetModalRef.current?.present();
  };
  console.log(data)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar style="auto" />
        <Text style={styles.textMyCases}>My Cases</Text>
        {data.length ?  <ScrollView style={styles.containerScroll}>
        {data?.map((dataCase,i)=><CardCases data={dataCase} key={i}/>)}

      </ScrollView> :
        <NoCases />}
        <View style={styles.containerAddCaseButton}>
          <ButtonAddCase style={styles.addCaseButton} onPress={handlerModal}/>
          <ModalAddCase
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
            setData={setData} 
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
export default HomeScreen;

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000511",
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
    borderRadius: 25,
    marginRight: 10,
   
  },
  containerAddCaseButton: {
    // backgroundColor: "red",
    height: "8%",
    alignItems: "flex-end",
  },
});
