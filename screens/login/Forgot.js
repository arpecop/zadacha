import React, { useState, useEffect } from 'react'

import { Auth } from 'aws-amplify'

import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import Error from './Error'
import styles from './styles'
import Layout from '../../layout/LayoutLogin'

const Forgot = () => {
  const [state, setState] = useState({
    username: '',
    error: '',
    validation: '',
    password: '',
    confirmPassword: '',
    stage: 0,
  })

  const login = async () => {
    console.log('======', state)
    try {
      await Auth.forgotPassword(state.username)
      setState({ ...state, stage: 1 })
    } catch (err) {
      setState({ ...state, error: err })
    }
  }
  const submitCode = () => {
    setState({ ...state, stage: 2 })
  }
  const changePassword = async () => {
    try {
      if (state.password === state.confirmPassword) {
        await Auth.forgotPasswordSubmit(state.username, state.validation, state.password)
        setState({ ...state, stage: 3, error: { name: 'Empty' } })
      } else {
        setState({
          ...state,
          error: { name: 'PasswordNotMatch', message: "Passwords don't Match" },
        })
      }
    } catch (err) {
      setState({ ...state, error: err })
    }
  }
  const handleUpdate = (event) => {
    setState({
      ...state,
      [event.target]: event.value,
    })
  }
  return (
    <Layout>
      <Text>{state.error && <Error errorMessage={state.error} />}</Text>
      {state.stage === 0 && (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='username'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'username', value: text })}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={login}>
            <Text style={styles.loginText}>Next</Text>
          </TouchableOpacity>
        </>
      )}

      {state.stage === 1 && (
        <>
          <Text style={{ color: 'white' }}>Check your email-a си for confirmation code</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='4 digit code...'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'validation', value: text })}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={submitCode}>
            <Text style={styles.loginText}>Confirm</Text>
          </TouchableOpacity>
        </>
      )}

      {state.stage === 2 && (
        <>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder='password...'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'password', value: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder='confirm password...'
              placeholderTextColor='#003f5c'
              autoCapitalize='none'
              onChangeText={(text) => handleUpdate({ target: 'confirmPassword', value: text })}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={changePassword}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {state.stage === 3 && (
        <>
          <>
            <Text>Password Changed!</Text>
          </>
        </>
      )}
    </Layout>
  )
}

export default Forgot
