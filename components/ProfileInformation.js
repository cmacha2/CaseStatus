import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import React from "react";
import MyText from "./MyText";
import Colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFirstName, updateUserLastName, updateUserStatus } from "../src/utils/userOperations";
import { resetFirstName, resetLastName, resetStatus } from "../src/features/user";

const ProfileInformation = () => {
  const user = useSelector((state) => state.user);
  const theme = useColorScheme();
  return (
    <View  style={{paddingBottom:35}}>
      <MyText
        type="caption"
        style={{ fontWeight: "600", color: Colors[theme].text + "40" }}
      >
        INFORMATION
      </MyText>
      <InfoField
        theme={theme}
        label={"First Name"}
        canEdit
        value={user.firstName}
        handleUpdate={updateUserFirstName}
        handleRedux={resetFirstName}
      />
      <InfoField
        theme={theme}
        label={"Last Name"}
        canEdit
        value={user.lastName}
        handleUpdate={updateUserLastName}
        handleRedux={resetLastName}
      />
      <InfoField
        theme={theme}
        label={"Email"}
        value={user.email}
      />
      <InfoField
        theme={theme}
        label={"Status"}
        canEdit
        value={user.status}
        handleUpdate={updateUserStatus}
        handleRedux={resetStatus}
      />
    </View>
  );
};

export default ProfileInformation;

function InfoField({
  label,
  value,
  theme,
  canEdit,
  handleUpdate,
  handleRedux,
}) {
  const { id } = useSelector((state) => state.user);
  const [localValue, setLocalValue] = React.useState(value);
  const dispatch = useDispatch();

  return (
    <View style={[styles.fieldContainer,{borderBottomColor:Colors[theme].text + '80'}]}>
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          color: Colors[theme].text + "80",
          paddingRight: 10,
        }}
      >
        {label}
      </MyText>
      <TextInput
        placeholder={label}
        value={localValue}
        placeholderTextColor={Colors[theme].text + "80"}
        onChangeText={canEdit && setLocalValue}
        keyboardType={canEdit ? "web-search" : "default"}
        onSubmitEditing={(event) => {
          canEdit && handleUpdate(id, event.nativeEvent.text);
          canEdit && dispatch(handleRedux(event.nativeEvent.text));
        }}
        style={{ fontWeight: "600", color: Colors[theme].text, flexShrink: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
  },
});
