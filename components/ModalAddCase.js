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

const ModalAddCase = ({  bottomSheetModalRef, snapPoints }) => {
  const [numberCase, setNumerCase] = useState("");
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const [errorFirstDigits, setErrorFirstDigits] = useState("");
  const [errorSize, setErrorSize] = useState("");

  const addCase = async () => {
    try {
      const { data } = await createCase(numberCase,id);
      console.log(data)
      dispatch(resetCases(data));
    } catch (e) {
      console.log(e, "error publishing case");
    }
  };

  const onChangeText = (caseNum) => {
    setNumerCase(caseNum);
    let { errors } = validate(caseNum);
    console.log(errors)
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
      <View style={styles.containerAddCase}>
        <BottomSheetTextInput
          placeholder="Text your Case Number"
          value={numberCase}
          onChangeText={onChangeText}
          style={styles.input}
        />
        <ButtonAddCase style={styles.addCaseButton} onPress={addCase} />
      </View>
      {errorSize && <Text style={styles.errors}>{errorSize}</Text>}
      {errorFirstDigits && (
        <Text style={styles.errors}>{errorFirstDigits}</Text>
      )}
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
    paddingTop: 20,
  },
  input: {
    width: "75%",
    height: "95%",
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    paddingLeft: 5,
  },
  addCaseButton: {
    // backgroundColor:'red'
  },
  errors: {
    color: "red",
    marginLeft: 20,
  },
});
