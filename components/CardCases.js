import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const data = {
    receiptNumber: "IOE0917114571",
    receiptDate: "Aug 3, 2022",
    titleCase: "Case was received and A Receipt Notice was Sent",
    lastUpdate: "64 days ago",
    typeForm: "I-765",
  };

const CardCases = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text></Text>
     </View>
    </View>
  )
}

export default CardCases

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    cardContainer:{
        backgroundColor:"red"
    },
})