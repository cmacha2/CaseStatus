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
import { useDispatch, useSelector } from "react-redux";
import ListHeader from "../components/ListHeader";
import { FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { resetCaseUpdate } from "../src/features/user";
import {
  getReceiptsNumbers,
  StatusAllCases,
} from "../src/utils/casesOperations";
import moment from "moment";
import { View } from "../components/theme/Themed";

function Cases() {
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["35%"], []);
  const { cases } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  // console.log(cases)

  const handlerModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const onRefresh = async () => {
    try {
      setLoading(true);
      let updateCases = await StatusAllCases(cases);
      dispatch(resetCaseUpdate(updateCases));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ListHeader
            isLoading={loading}
            handleRefresh={onRefresh}
            title="My Cases"
            iconName="add-circle-sharp"
            handleNavigation={handlerModal}
          />
          <Text style={styles.lastRefresh}>
            {cases?.length
              ? `Last refresh: ${moment(cases[0].updateAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}`
              : null}
          </Text>
          {cases?.length ? (
            <FlashList
              data={cases}
              contentContainerStyle={
                Platform.OS === "ios" && { paddingVertical: 30 }
              }
              renderItem={({ item }) => <CardCases data={item} />}
              estimatedItemSize={10}
              keyExtractor={(item) => item.id}
              refreshing={loading}
              onRefresh={onRefresh}
            />
          ) : (
            <NoCases />
          )}
          <ModalAddCase
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
          />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
}

AppRegistry.registerComponent("Cases", () => Cases);
export default Cases;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
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
  lastRefresh: {
    paddingHorizontal: 17,
    marginTop: 2,
    color: "gray",
    fontFamily: "sans-serif-condensed",
  },
});
