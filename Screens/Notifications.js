import { StyleSheet, Text, Platform, StatusBar, Button} from 'react-native'
import React from 'react'
import { View } from '../components/theme/Themed'
import { FlashList } from '@shopify/flash-list'
import ListHeader from '../components/ListHeader'
import { useDispatch, useSelector } from 'react-redux'
import { loadMoreNotificationsReducer,
    setNotificationsReducer
} from '../src/features/notifications'
import { getNotificationsByUserID } from '../src/utils/notifications'
import NotificationCard from '../components/NotificationCard'
import NoNotifications from '../components/NoNotifications'


const Notifications = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const { notifications} = useSelector(state => state.notifications)
    const [nextToken, setNextToken] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

React.useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      const { nextTokenUtil, notificationsList } =
        await getNotificationsByUserID(user.id);
      setNextToken(nextTokenUtil);
      dispatch(setNotificationsReducer(notificationsList));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function fetchMoreNotifications() {
    if (nextToken) {
      try {
        setLoading(true);
        const { nextTokenUtil, notificationsList } =
          await getNotificationsByUserID(user.id, nextToken);
        setNextToken(nextTokenUtil);
        if (nextTokenUtil === null) {
          alert("No more notifications to load 🤯");
        }
        dispatch(loadMoreNotificationsReducer(notificationsList));
        setLoading(false);
      } catch (e) {
        console.log;
      }
    } else {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 0 }}>
      <ListHeader flag title={"Notifications"} />
      {notifications.length===0? <NoNotifications/>
      :<FlashList
        data={notifications}
        renderItem={({ item }) => <NotificationCard {...item} />}
        contentContainerStyle={Platform.OS === "ios" && { paddingVertical: 30 }}
        estimatedItemSize={200}
        ListFooterComponent={() => {
          {notifications.length===99 && (<Button
            onPress={fetchMoreNotifications}
            title={loading ? "loading" : "load more notifications"}
            disabled={loading || nextToken === null}
          />)}
        }}
        refreshing={loading}
        onRefresh={fetchNotifications}
      />}
      <StatusBar />
    </View>
  );
}

export default Notifications