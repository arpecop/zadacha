import React, { useState, useEffect } from 'react'

import { Text, View, Button } from 'react-native'
import Amplify, { Auth, Hub } from 'aws-amplify'
import styles from './styles'
export default function SSO () {
  const [user, setUser] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(data)
      switch (event) {
        case 'signIn':
          setUser(data)
          setIsLoggedIn(true)
          console.log('User logged in: ', data)
          break
        case 'signOut':
          setUser('')
          setIsLoggedIn(false)
          console.log('User logged out: ', data)
          break
        case 'customOAuthState':
          setUser(data)
      }
    })
  }, []) //call Hub listen only on component mount & unmount

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <View>
          <Text>User logged in as {user.username}</Text>
        </View>
      ) : (
        <View>
          <Button
            title='FacebookSignIn'
            style={styles.loginBtn}
            onPress={() => {
              Auth.federatedSignIn({ provider: 'Facebook' })
            }}
          />
        </View>
      )}
    </React.Fragment>
  )
}
