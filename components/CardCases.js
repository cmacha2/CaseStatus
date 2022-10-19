import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { Swipeable } from "react-native-gesture-handler";
import { deleteCase } from "../src/utils/casesOperations";
import { useDispatch } from "react-redux";
import { resetCaseDelete } from "../src/features/user";
import { FontAwesome5 } from "@expo/vector-icons";
import { colorSelect, selectImageUrls } from "../src/utils/imageStatus";
import {useNavigation} from '@react-navigation/native'
import MyText from "./MyText";
import { useColorScheme } from "react-native";

const CardCases = ({ data }) => {
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const caseDelete = async () => {
    try {
      await deleteCase(data.id);
      dispatch(resetCaseDelete(data.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <LeftAction progress={progress} dragX={dragX} />
      )}
      onSwipeableRightWillOpen={caseDelete}
    >
      <Pressable style={styles.containerCards} onPress={()=>navigation.navigate('CaseDetails',{data}) }>
        <View
          style={[
            styles.cardContainer,
            { borderLeftColor: colorSelect(data.titleCase),
              borderLeftWidth: 6,
              borderTopColor:'gray',
              borderRightColor:'gray',
              borderBottomColor:'gray',
            },
          ]}
        >
          <View style={styles.cardTop}>
            <MyText style={styles.receiptNumber}>{data.receiptNumber}</MyText>
            <MyText style={styles.typeForm}>{data.typeForm}</MyText>
          </View>
          <MyText type="caption" style={styles.titleCase}>{data.titleCase}</MyText>
          <View style={styles.cardBottom}>
            <Text style={styles.lastChange}>
              Last change:{" "}
              {moment(new Date(data.receiptDate).toISOString()).fromNow()}
            </Text>
            <Text style={styles.lastChange}>{data.receiptDate}</Text>
          </View>
        </View>
        {/* <MyButton title='X' onPress={()=>deleteCase(data.id)} /> */}
      </Pressable>
    </Swipeable>
  );
};

export default CardCases;

const LeftAction = ({ progress, dragX }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  
  return (
    <View style={styles.rightAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        <FontAwesome5 name="trash-alt" size={24} color="white" />
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCards: {
    alignItems: "center",
    paddingVertical: 7,
  },
  cardContainer: {
    width: "92%",
    height: "auto",
    paddingBottom: 10,
    borderRadius: 7,
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 15,
    marginTop: 8,
  },
  cardTop: {
    flexDirection: "row",
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeForm: {
    marginRight: 10,
    marginTop: 12,
    color: "gray",
    // fontFamily: "sans-serif-condensed",
  },
  receiptNumber: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    // fontFamily: "sans-serif-condensed",
  },
  titleCase: {
    marginTop: 5,
    marginLeft: 10,
    // fontFamily: "sans-serif-condensed",
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  lastChange: {
    marginLeft: 10,
    marginTop: 2,
    color: "gray",
    fontFamily: "sans-serif-condensed",
  },
  cardBottomLeft: {
    flexDirection: "column",
  },
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 7,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
  },

  trashIcon: {
    // marginLeft: 30,
  },
});

// My Case Was Received   <FontAwesomeIcon icon="fa-duotone fa-inbox-in" />
// My Case Accepted By The USCIS Lockbox   <FontAwesomeIcon icon="fa-regular fa-mailbox" />
// My Fingerprint Fee Was Received     <FontAwesomeIcon icon="fa-thin fa-fingerprint" />
// My Case Was Updated To Show Fingerprints Were Taken     <FontAwesomeIcon icon="fa-regular fa-fingerprint" />
// My Request for Additional Evidence Was Sent <FontAwesomeIcon icon="fa-light fa-folder-open" />
// My Request for Additional Evidence Was Received  <FontAwesomeIcon icon="fa-regular fa-folder-open" />
// My Case is Being Actively Reviewed  <FontAwesomeIcon icon="fa-light fa-magnifying-glass" />
// My Case Is On Hold   <FontAwesomeIcon icon="fa-regular fa-clock" />
// My Case is Ready to Be Scheduled for An Interview  <FontAwesomeIcon icon="fa-thin fa-user-police" />
// My Case is Scheduled for An interview <FontAwesomeIcon icon="fa-duotone fa-user-police-tie" />
// My Case Was Submitted For Quality Review Based On An Approval Recommendation <FontAwesomeIcon icon="fa-thin fa-money-check-pen" />
// My Case Was Approved <FontAwesomeIcon icon="fa-regular fa-face-smile" />
// My Card Was Mailed To Me <FontAwesomeIcon icon="fa-light fa-envelopes-bulk" />
// My Card Was Picked Up By The United States Postal Service <FontAwesomeIcon icon="fa-brands fa-usps" />
// My Card Was Delivered To Me By The Post Office <FontAwesomeIcon icon="fa-regular fa-envelope-circle-check" />
// My Case Was Sent To The Department of State <FontAwesomeIcon icon="fa-regular fa-flag-usa" />
// My Certificate Of Naturalization Was Issued  <FontAwesomeIcon icon="fa-light fa-file-certificate" />
