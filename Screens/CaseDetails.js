import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import MyText from "../components/MyText";
import { ScrollView } from "../components/theme/Themed";
import { colorSelect } from "../src/utils/imageStatus";
import Hyperlink from "react-native-hyperlink";
import moment from "moment";

const CaseDetails = () => {
  const route = useRoute();
  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://res.cloudinary.com/cmacha2/image/upload/v1666101823/my_logo_afhaaw.png",
        }}
      />
      <MyText style={[styles.titleCase]}>{data.titleCase}</MyText>

      <Hyperlink linkStyle={{ color: "#2980b9" }} linkDefault={true}>
        <MyText type="body" style={styles.description}>
          {data.description.slice(data.titleCase.length)}
        </MyText>
      </Hyperlink>
      {/* <View
        style={[
          styles.containerStatus,
          { borderTopColor: colorSelect(data.titleCase) },
        ]}
      >
        <View>
          <MyText  type="caption" style={ { marginTop: 10 }}>
            Type Form :
          </MyText>
          <MyText
             type="caption"
            style={ { fontWeight: "bold" }}
          >
            {data.typeForm}
          </MyText>
        </View>
        <View>
          <MyText   type="caption" style={ { marginTop: 10 }}>
            Last Update :
          </MyText>
          <MyText
              type="caption"
            style={ { fontWeight: "bold" }}
          >
            {data.receiptDate}
          </MyText>
        </View>
        <View>
          <MyText   type="caption" style={ { marginTop: 10,  flexShrink: 1 }}>
            Days since last update :
          </MyText>
          <MyText
            type="caption"
            style={ { fontWeight: "bold" ,    flexShrink: 1}}
          >
            {moment(new Date(data.receiptDate).toISOString()).fromNow()}
          </MyText>
        </View>
      </View> */}
       {/* <View style={styles.containerLogo}>
      <Image style={styles.uscisImg} source={{ uri: "https://res.cloudinary.com/cmacha2/image/upload/v1666113220/SealsSignatures_USCIS_2x_pbeqqk.png" }} />
      </View>  */}
    </ScrollView>
  );
};

export default CaseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  receiptNumber: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleCase: {
    marginTop: 13,
    paddingBottom: 2,
    marginHorizontal: 8,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "500",
  },
  containerStatus: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    paddingHorizontal: 10,

  },
  image: {
    width: 217,
    height: 58,
    marginTop: 15,
    alignSelf: "center",
  },
  containerLogo:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  uscisImg: {
    width: "62%",
    height:"40%",
    justifyContent: "center",
    alignSelf: "center",
  },
  description: {
    marginTop: 20,
    marginHorizontal: 8,
    textAlign: "center",
    fontSize: 18,
  },
});
