import { StyleSheet, Text} from 'react-native'
import React from 'react'
import MyText from './MyText'
import { View } from '../components/theme/Themed'

const NoCases = () => {
  return (
    <View style={styles.container}>
      <MyText style={styles.textCase}>No cases available for checking</MyText>
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
        fontFamily:"sans-serif-condensed"
    }
})