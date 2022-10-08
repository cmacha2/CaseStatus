import { StyleSheet, Text, View } from "react-native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetTextInput,
  } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import ButtonAddCase from "./ButtonAddCase";

const ModalAddCase = ({setData,bottomSheetModalRef,snapPoints}) => {
    const [numberCase,setNumerCase] = useState('')

    
    const addCase = () =>{
        setData((prevData)=> prevData.length < 5 ? setData([...prevData,numberCase]) : setData([...prevData]))
    }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 30 }}
      keyboardBlurBehavior="restore"
    >
      <View style={styles.containerAddCase}>
        <BottomSheetTextInput placeholder="Text your Case Number" value={numberCase} onChangeText={(text)=>setNumerCase(text)} style={styles.input} />
        <ButtonAddCase style={styles.addCaseButton} onPress={addCase}/>
      </View>
      <Text style={styles.errors}>Max caracteres 13 digits</Text>
      
    </BottomSheetModal>
  );
};

export default ModalAddCase;

const styles = StyleSheet.create({
    containerAddCase: {
        height: "55%",
        // backgroundColor:'red',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop:20,
      },
    input: {
        width: "75%",
        height: "95%",
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        backgroundColor: "rgba(151, 151, 151, 0.25)",
        paddingLeft:5
      },
      addCaseButton:{
        // backgroundColor:'red'
      },
      errors:{
        color:'red',
        marginLeft:20,
      }
});
