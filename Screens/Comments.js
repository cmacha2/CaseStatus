import { StyleSheet, Text, View as DefaultView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'react-native'
import moment from 'moment'
import { View } from '../components/theme/Themed'
import MyText from '../components/MyText'
import  Colors  from '../constants/colors'
import { useColorScheme } from 'react-native'
import CommentInput from '../components/CommentInput'
import { Pressable } from 'react-native'
import { useSelector } from 'react-redux'

const Comments = () => {
  const theme = useColorScheme()
  const route = useRoute()
  const { comments } = useSelector((state) => state.posts)
  const { postID, authorPostID } = route.params


  return (
    <DefaultView style={{flex:1,
      backgroundColor: Colors[theme].background,
    }}>
      <FlashList 
        data={comments}
        contentContainerStyle={{paddingTop:10}}
        renderItem={({item}) => <CardComment comment={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
      />
      <CommentInput postCommentsId={postID} userCommentsId={authorPostID}/>
    </DefaultView>
  )
}

export default Comments

const CardComment = ({ comment }) => {
  const theme = useColorScheme()
  const navigation = useNavigation()

  return (
    <DefaultView style={[styles.containerCard,{
      borderColor: Colors[theme].text + '20',
    }]}>
      <DefaultView style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Profile', { id: comment.user.id })}>
       <Image source={{ uri: comment.user.profilePicture }} style={styles.image} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profile', { id: comment.user.id })} style={styles.content}>
          <MyText type='body' style={styles.name}>{comment.user.firstName +' '+comment.user.lastName}</MyText>
          <MyText style={{ color: "gray",fontSize:12 }}>{moment(comment.createdAt).fromNow()}</MyText>
        </Pressable>
      </DefaultView>
          <MyText type='caption' style={styles.comment}>{comment.content}</MyText>
    </DefaultView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
  },
  comment: {
    marginTop: 5,
    fontSize: 14,
  },
  containerCard: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
  },
})