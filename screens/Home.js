import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Video, AVPlaybackStatus } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
//import { TouchableOpacity } from 'react-native-gesture-handler'
export default function Home ({ navigation }) {
  const videos = [
    'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
    'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
  ]
  const video = React.useRef(null)
  const [status, setStatus] = useState({})
  const [currentVideo, setCurrentVideo] = useState(null)
  const x = index => {
    setCurrentVideo(index)
    video.current.playAsync()
  }
  return (
    <ScrollView style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videos[currentVideo]
        }}
        useNativeControls
        resizeMode='contain'
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          <Ionicons
            name={
              status.isPlaying ? 'pause-circle-outline' : 'play-circle-outline'
            }
            size={32}
            color='green'
          />
        </TouchableOpacity>
      </View>
      {videos.map((video, index) => (
        <View key={index} style={styles.buttons}>
          <Button
            style={styles.buttons}
            title={`Video ${index + 1}`}
            onPress={() => x(index)}
          />
        </View>
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSelecteds: { backgroundColor: '#2ecc71' }
})
