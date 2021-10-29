import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../screens/login/styles';

const image = require('../assets/images/back.jpg');

const Layout = ({ children }) => (
  <View style={styles.container} key='container_login'>
    <ImageBackground source={image} style={styles.image}>
      {children}
    </ImageBackground>
  </View>
);
export default Layout;
