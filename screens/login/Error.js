import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const Error = props =>
  Object.entries(props).map(
    ([err, val]) =>
      val.name !== 'Empty' && (
        <View style={styles.errorbox} key={val.name}>
          <Text style={styles.errorboxText}>{val.message}</Text>
        </View>
      )
  );
export default Error;
