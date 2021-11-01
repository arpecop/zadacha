import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../screens/login/styles';

const image = require('../assets/images/back.jpg');

const Layout1 = ({ children }) => (
  <View style={styles.container} key='container_login'>
    <ImageBackground source={image} style={styles.image}>
      {children}
    </ImageBackground>
  </View>
);
const Layout = ({ children }) => (
  <View style={styles.container} key='container_login'>
    <View style={styles.image}>{children}</View>
  </View>
);
export default Layout;
