import React, { useState, useEffect } from 'react'

import { GiftedChat } from 'react-native-gifted-chat'

import { View } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'
import { put, post } from '../utils/api'

const io = require('socket.io-client')

const socket = io('http://rudixauth.herokuapp.com/')
const Home = ({ route, navigation }) => {
  const { user, room } = route.params
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('receive message', (payload) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [payload]))
    })
    navigation.setOptions({ title: room })
    socket.emit('room', { room })
  }, []) // only re-run the effect if new message comes in

  useEffect(() => {
    async function fetchData () {
      const prevData = await post({
        collection: `test${room.replace('#', '')}`,
        limit: 100,
      })
      console.log()

      setMessages(prevData.data.Items)
    }
    fetchData()
    // AsyncStorage.removeItem('user');
  }, [room])

  const onSend = (msgs) => {
    const msg = {
      room,
      ...msgs[0],
      _id: new Date().getTime().toString(),
    }
    socket.emit('new message', msg)
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg))

    const x = {
      vreme: new Date().getTime(),
      tip: `test${msg.room.replace('#', '')}`,
      ...msg,
    }

    put(x)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#121824' }}>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage
        onSend={(msg) => onSend(msg)}
        user={{
          _id: user.username,
          name: user.username,
        }}
      />
      <AdMobBanner
        bannerSize='fullBanner'
        // eslint-disable-next-line max-len
        adUnitID='ca-app-pub-5476404733919333/2535930782' // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
      />
    </View>
  )
}
export default Home
