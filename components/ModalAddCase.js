import { StyleSheet, Text, View } from "react-native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetTextInput,
  } from "@gorhom/bottom-sheet";
import React from "react";
import ButtonAddCase from "./ButtonAddCase";

const ModalAddCase = ({bottomSheetModalRef,snapPoints}) => {
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 30 }}
      keyboardBlurBehavior="restore"
    >
      <View style={styles.containerAddCase}>
        <BottomSheetTextInput style={styles.input} />
        <ButtonAddCase style={styles.addCaseButton}/>
      </View>
    </BottomSheetModal>
  );
};

export default ModalAddCase;

const styles = StyleSheet.create({
    containerAddCase: {
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
    input: {
        width: "75%",
        height: "35%",
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        backgroundColor: "rgba(151, 151, 151, 0.25)",
      },
      addCaseButton:{
        // backgroundColor:'red'
      }
});
