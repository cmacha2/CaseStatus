import { StyleSheet, Text} from 'react-native'
import React from 'react'
import MyText from './MyText'
import { View } from '../components/theme/Themed'

const NoNotifications = () => {
  return (
    <View style={styles.container}>
    <MyText style={styles.textNotification}>There are no notifications at the moment</MyText>
  </View>
  )
}

export default NoNotifications

const styles = StyleSheet.create({
    container:{
      flex:1,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent: 'center',
        // paddingBottom:100,
    },
    textNotification:{
        fontSize: 15,
        textAlign:"center",
        // backgroundColor: "#f0f0f0",
        fontFamily:"sans-serif-condensed"
    }
})