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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ListHeader from "../components/ListHeader";


function Cases() {
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["18%"], []);
  const  {cases} = useSelector((state) => state.user);

  const handlerModal = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ListHeader title='My Cases' iconName="add-circle-sharp"
            handleNavigation={handlerModal}/>
        {cases?.length ?  <ScrollView style={styles.containerScroll}>
        {cases?.map(userCase => <CardCases data={userCase} key={userCase.id}/>)}

      </ScrollView> :
        <NoCases />}
          <ModalAddCase
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
          />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent("Cases", () => Cases);
export default Cases;

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
    
    height: "8%",

    alignItems: "flex-end",
  },
});
