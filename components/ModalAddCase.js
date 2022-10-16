import { StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import ButtonAddCase from "./ButtonAddCase";
import validate from "../helpers/validate";
import { createCase } from "../src/utils/casesOperations";
import { resetCases } from "../src/features/user";
import { useDispatch, useSelector } from "react-redux";
import MyText from "./MyText";

const ModalAddCase = ({  bottomSheetModalRef, snapPoints }) => {
  const [numberCase, setNumerCase] = useState("");
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const [errorFirstDigits, setErrorFirstDigits] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorNumber, setErrorNumber] = useState("");

  const addCase = async () => {
    try {
      const data = await createCase(numberCase,id);
      if (data.error!==undefined) {
        setErrorNumber(`Case number ${numberCase} not found`);
        return;
      }
      dispatch(resetCases(data));
      bottomSheetModalRef.current?.close();
    } catch (e) {
      console.log(e, "error publishing case");
    }
  };

  const onChangeText = (caseNum) => {
    setNumerCase(caseNum);
    setErrorNumber("");
    let { errors } = validate(caseNum);
    errors.size ? setErrorSize(errors.size) : setErrorSize("");
    errors.threeDigits
      ? setErrorFirstDigits(errors.threeDigits)
      : setErrorFirstDigits("");
    if (!caseNum.length) {
      setErrorSize("");
      setErrorFirstDigits("");
    }
  };


  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 30 }}
      keyboardBlurBehavior="restore"
    >
      <View style={styles.modalTop}>
        <MyText type="body">Enter USCIS receipt number</MyText>
        <MyText type="caption" style={{marginTop:10}}>
        The receipt number is your unique 13 character identifier
        </MyText>
        <MyText type="caption" style={{marginTop:10}}>
          Example: EAC, WAC, LIN, SRC, MSC, IOE, NBC, MCT or YSC and 10 numbers
        </MyText>
      </View>

      <View style={styles.containerAddCase}>
        <BottomSheetTextInput
          placeholder="Enter the receipt number"
          value={numberCase}
          onChangeText={onChangeText}
          style={styles.input}
        />
        <ButtonAddCase style={styles.addCaseButton} onPress={addCase} disabled={(Boolean(errorFirstDigits) || Boolean(errorSize))}/>
      </View>
      <View style={styles.modalBottom}>
        {errorSize && <Text style={styles.errors}>{errorSize}</Text>}
        {errorFirstDigits && (
          <Text style={styles.errors}>{errorFirstDigits}</Text>
        )}
        {errorNumber && <Text style={styles.errors}>{errorNumber}</Text>}
      </View>
    </BottomSheetModal>
  );
};

export default ModalAddCase;

const styles = StyleSheet.create({
  containerAddCase: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalTop: {
    flex: 2,
marginHorizontal:10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "75%",
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    paddingLeft: 5,
  },
  addCaseButton: {
    // backgroundColor:'red'
  },
  modalBottom: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  errors: {
    color: "red",
    marginLeft: 20,
  },
});
