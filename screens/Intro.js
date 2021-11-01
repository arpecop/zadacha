import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text, StyleSheet, ImageBackground, Image } from 'react-native';
import constant from '../utils/constants';

const slides = [
  {
    key: 1,
    title:
      'MyPwrApp - Your journey to personal power! \nMeet your most powerful self!',
    image: require('../assets/intro/1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Your community, a safe and supportive place.',

    image: require('../assets/intro/2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Reconnect to self and set new and powerful personal boundaries',
    image: require('../assets/intro/3.png'),
    backgroundColor: '#22bcb5',
  },
];

const Intro = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.image}
      style={[
        styles.slide,
        {
          width: '100%',
          height: '100%',
        },
      ]}
    >
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>{item.title}</Text>
    </ImageBackground>
  );

  const onDone = () => {
    navigation.navigate('Login');
  };
  return (
    <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingTop: constant.height * 0.1,
    alignItems: 'center',
  },
  logo: { width: 75, height: 75, marginBottom: 20 },
  title: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Assistant',
    fontWeight: '500',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});
export default Intro;
