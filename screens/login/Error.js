import React from 'react'

import { Text, View } from 'react-native'
import styles from './styles'

const translated = {
  UserNotFoundException: 'The user does not exist',
  AuthError: 'Username or Password cannot be empty',
  CodeMismatchException: 'Invalid code , please try again',
  NotAuthorizedException: 'Username or password not valid',
  UsernameExistsException: 'The user does not exist',
  PasswordNotMatch: 'Passwords does not match',
  InvalidParameterException: 'the password minimum length is 6 symbols',
  Empty: '',
}

const Error = (props) =>
  Object.entries(props).map(
    ([err, val]) =>
      val.name !== 'Empty' && (
        <View key={val.name} style={styles.errorbox}>
          <Text style={styles.errorboxText}>
            {translated[val.name] ? translated[val.name] : `${val.message}-${val.name}`}
          </Text>
        </View>
      ),
  )

export default Error
