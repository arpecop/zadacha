import React, { useState, useEffect } from 'react'

import { Auth } from 'aws-amplify'

import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import Error from './Error'
import styles from './styles'
import Layout from '../../layout/LayoutLogin'

const SignUp = ({ navigation }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    authCode: '',
    stage: 0,
    error: { name: 'Empty' },
  })

  const handleUpdate = (event) => {
    setState({
      ...state,
      [event.target]: event.value,
    })
  }

  const signUp = async () => {
    const { username, password, email } = state
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      })
      setState({ ...state, stage: 1, error: { name: 'Empty' } })
      navigation.setOptions({ title: 'Потвърди кода' })
    } catch (err) {
      setState({ ...state, error: err })
    }
  }

  const confirmSignUp = async () => {
    const { username, authCode, email } = state
    try {
      await Auth.confirmSignUp(username, authCode)
      setState({ ...state, stage: 2, error: { name: 'Empty' } })
    } catch (err) {
      setState({ ...state, error: err })
    }
  }
  return (
    <Layout>
      {state.stage === 0 && (
        <>
          {state.error && <Error errorMessage={state.error} />}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='username'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'username', value: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder='password'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'password', value: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='email...'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'email', value: text })}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={signUp}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {state.stage === 1 && (
        <>
          {state.error && <Error errorMessage={state.error} />}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='auth code...'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'authCode', value: text })}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={confirmSignUp}>
            <Text style={styles.loginText}>Confirm</Text>
          </TouchableOpacity>
        </>
      )}
      {state.stage === 2 && (
        <>
          <Text>You Signed up successfully</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={confirmSignUp}>
            <Text style={styles.loginText}>Влез</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  )
}

export default SignUp
