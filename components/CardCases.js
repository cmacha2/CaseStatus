import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import SVGImg from "../assets/received.svg";
import Loader from "./Icons";

const data = {
  receiptNumber: "IOE0917114571",
  receiptDate: "Aug 3, 2022",
  titleCase: "Case was received and A Receipt Notice was Sent",
  lastChange: "64 days ago",
  typeForm: "I-765",
};

const CardCases = ({data}) => {

  return (

      <View style={styles.containerCards}>
        <View style={styles.cardContainer}>
          <View style={styles.cardTop}>
            <Image
              style={styles.image}
              source={{
                uri: "https://www.iconpacks.net/icons/2/free-incoming-mail-icon-2577-thumb.png",
              }}
            />
            <Text style={styles.receiptNumber}>{data.receiptNumber}</Text>
            <Text style={styles.typeForm}>{data.typeForm}</Text>
          </View>
          <Text style={styles.titleCase}>{data.titleCase}</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.lastChange}>
              Last Change: {data.lastChange}
            </Text>
            <Text style={styles.lastChange}>{data.receiptDate}</Text>
          </View>
        </View>
      </View>
  );
};

export default CardCases;

const styles = StyleSheet.create({

  containerCards: {
    alignItems: "center",
    paddingVertical: 7,
  },
  cardContainer: {
    width: "90%",
    height: 114,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#3C3838",
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

    justifyContent: "space-between",
  },
  typeForm: {
    marginRight: 10,
    marginTop: 12,
    color: "gray",
    fontFamily: "sans-serif-condensed",
  },
  receiptNumber: {
    marginTop: 12,
    // marginRight:30,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif-condensed",
  },
  titleCase: {
    marginTop: 5,
    marginLeft: 10,
    fontFamily: "sans-serif-condensed",
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
