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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Welcome
