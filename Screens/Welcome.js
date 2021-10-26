import * as React from 'react'

import { StyleSheet, Text, View } from 'react-native'
function Welcome ({ user }) {
  return (
    <View style={styles.container}>
      <Text>{user.username}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
})
export default Welcome
