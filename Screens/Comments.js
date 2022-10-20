import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const Comments = () => {
const route = useRoute()
const { post } = route.params
console.log(post.comments.items[0])

  return (
    <View>
      <Text>Comments</Text>
    </View>
  )
}

export default Comments

const styles = StyleSheet.create({})