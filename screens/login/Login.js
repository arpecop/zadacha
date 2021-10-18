import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'
import { loggedInUserData } from '../../utils/state'
import Error from './Error'
import styles from './styles'

const image = require('../../assets/images/back.jpg')

const Login = ({ navigation }) => {
  const [user, setUser] = useRecoilState(loggedInUserData)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const login = async () => {
    try {
      await Auth.signIn(username, password)
      const user1 = await Auth.currentAuthenticatedUser()
      const session = await Auth.currentSession()
      const userInfo = {
        ...user1.attributes,
        username: user1.username,
        token: session.accessToken.jwtToken,
        refreshtoken: session.refreshToken.token
      }
      setUser(userInfo)
      AsyncStorage.setItem('user', JSON.stringify(userInfo))
    } catch (err) {
      setError(err)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.logo}>Women at Risk</Text>
        {error && <Error errorMessage={error} />}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='username'
            placeholderTextColor='#003f5c'
            autoCapitalize='none'
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder='password'
            placeholderTextColor='#003f5c'
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Login