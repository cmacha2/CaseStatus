import {
  StyleSheet,
  Text,
  useColorScheme,
  View as DefaultView,
} from "react-native";
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
import { View } from "./theme/Themed";
import Colors from "../constants/colors";

const ModalAddCase = ({ bottomSheetModalRef, snapPoints }) => {
  const [numberCase, setNumerCase] = useState("");
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const [errorFirstDigits, setErrorFirstDigits] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorNumber, setErrorNumber] = useState("");

  const addCase = async () => {

    if(numberCase.length!==13){
     return 
    }

    try {
      const data = await createCase(numberCase, id);
      if (data?.error) {
        return setErrorNumber(`Case number ${numberCase} not found`);
      }
      dispatch(resetCases(data));
      bottomSheetModalRef.current?.close();
      setNumerCase("");
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
    if (!caseNum?.length) {
      setErrorSize("");
      setErrorFirstDigits("");
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: Colors[theme].modalCase,
        borderRadius: 30,
        
      }}
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: Colors[theme].text + "80" }}
      handleStyle={{
        backgroundColor: Colors[theme].text + "20",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <DefaultView style={styles.modalTop}>
        <MyText type="body">Enter USCIS receipt number</MyText>
        <MyText type="caption" style={{ marginTop: 10 }}>
          The receipt number is your unique 13 character identifier
        </MyText>
        <MyText type="caption" style={{ marginTop: 10 }}>
          Example: EAC, WAC, LIN, SRC, MSC, IOE, NBC, MCT or YSC and 10 numbers
        </MyText>
      </DefaultView>

      <DefaultView style={styles.containerAddCase}>
        <BottomSheetTextInput
          placeholder="Enter the receipt number"
          placeholderTextColor={Colors[theme].text + "80"}
          value={numberCase}
          onChangeText={onChangeText}
          style={styles.input}
          autoCapitalize="characters"
        />
        <ButtonAddCase
          onPress={addCase}
          disabled={Boolean(errorFirstDigits) || Boolean(errorSize)}
        />
      </DefaultView>
      <DefaultView style={styles.modalBottom}>
        {errorSize && <Text style={styles.errors}>{errorSize}</Text>}
        {errorFirstDigits && (
          <Text style={styles.errors}>{errorFirstDigits}</Text>
        )}
        {errorNumber && <Text style={styles.errors}>{errorNumber}</Text>}
      </DefaultView>
    </BottomSheetModal>
  );
};

export default ModalAddCase;

const styles = StyleSheet.create({
  containerAddCase: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  modalTop: {
    marginHorizontal: 5,
    paddingTop: 12,
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
  modalBottom: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  errors: {
    color: "red",
    marginLeft: 20,
  },
});
