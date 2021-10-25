import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { Video } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../layout/Layout'
import constants from '../utils/constants'
import { Col, Row } from 'react-native-easy-grid'

export default function Home () {
  const video = React.useRef(null)
  const [status, setStatus] = useState({})
  const [currentVideo, setCurrentVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([])
  useEffect(() => {
    fetch('https://strapi.rudixlab.com/videos ')
      .then((response) => response.json())
      .then((json) => setVideos(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])
  return (
    <Layout>
      <View style={styles.container}>
        {currentVideo !== null && (
          <View>
            <Video
              shouldPlay
              ref={video}
              style={styles.video}
              source={{
                uri: 'https://strapi.rudixlab.com' + videos[currentVideo].url.url,
              }}
              useNativeControls
              resizeMode='contain'
              isLooping={false}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }>
                <Ionicons
                  name={status.isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
                  size={32}
                  color='green'
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView>
          {videos.map((video, index) => (
            <TouchableOpacity
              style={[styles.item, index === currentVideo && styles.itemSelected]}
              key={index}>
              <Row onPress={() => setCurrentVideo(index)}>
                <Col style={{ width: 55 }}>
                  <Image
                    style={styles.rowImage}
                    source={{
                      uri: 'https://strapi.rudixlab.com' + video.thumbnail.formats.medium.url,
                    }}
                  />
                </Col>
                <Col style={{ textAlign: 'center', justifyContent: 'center' }}>
                  <Text>{video.title}</Text>
                  <Text>{video.description}</Text>
                </Col>
                <Col style={{ width: 40, textAlign: 'center', justifyContent: 'center' }}>
                  <Ionicons name={'play-circle-outline'} size={32} color='gray' />
                </Col>
              </Row>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Layout>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  item: { borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, height: 50 },
  itemSelected: { backgroundColor: '#dfe4ea' },
  rowImage: { height: 50, width: 50 },
  video: {
    alignSelf: 'center',
    height: 200,
    width: constants.width,
  },
})
