import React, { useState } from 'react';

import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/intro/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/intro/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('./assets/intro/3.jpg'),
    backgroundColor: '#22bcb5',
  },
];

const Intro = () => {
  function renderItem () {}
  function onDone () {}
  return (
    <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
  );
};
export default Intro;
