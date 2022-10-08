import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoCases = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textCase}>No cases available for checking</Text>
    </View>
  )
}

export default NoCases

const styles = StyleSheet.create({
    container:{
      flex:1,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent: 'center',
        // paddingBottom:100,
    },
    textCase:{
        fontSize: 15,
        textAlign:"center",
        // backgroundColor: "#f0f0f0",
        color: "#000000",
        fontFamily:"sans-serif-condensed"
    }
})