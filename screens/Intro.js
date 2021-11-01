import React from 'react';
import { useRecoilState } from 'recoil';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, StyleSheet } from 'react-native';
import { sawIntroState } from '../utils/state';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/intro/1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/intro/2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../assets/intro/3.png'),
    backgroundColor: '#22bcb5',
  },
];

const Intro = ({ navigation }) => {
  const [state, setState] = useRecoilState(sawIntroState);
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  function onDone () {
    navigation.navigate('Login');
  }
  return (
    <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
  );
};
export default Intro;
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});
