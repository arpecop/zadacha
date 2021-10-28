import React, { useState } from 'react';

import { Auth } from 'aws-amplify';

import { Text, TextInput, TouchableOpacity } from 'react-native';
import Error from './Error';
import styles from './styles';
import Layout from '../../layout/LayoutLogin';
import { BlurView } from 'expo-blur';

const Forgot = ({ navigation }) => {
  const [state, setState] = useState({
    username: '',
    error: '',
    validation: '',
    password: '',
    confirmPassword: '',
    stage: 0,
  });

  const login = async () => {
    console.log('======', state);
    try {
      await Auth.forgotPassword(state.username);
      setState({ ...state, stage: 1 });
    } catch (err) {
      setState({ ...state, error: err });
    }
  };
  const submitCode = () => {
    setState({ ...state, stage: 2 });
  };
  const changePassword = async () => {
    try {
      if (state.password === state.confirmPassword) {
        await Auth.forgotPasswordSubmit(
          state.username,
          state.validation,
          state.password
        );
        setState({ ...state, stage: 3, error: { name: 'Empty' } });
      } else {
        setState({
          ...state,
          error: { name: 'PasswordNotMatch', message: "Passwords don't Match" },
        });
      }
    } catch (err) {
      setState({ ...state, error: err });
    }
  };
  const handleUpdate = event => {
    setState({
      ...state,
      [event.target]: event.value,
    });
  };
  return (
    <Layout>
      <Text>{state.error && <Error errorMessage={state.error} />}</Text>
      {state.stage === 0 && (
        <>
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='username'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: 'username', value: text })
              }
            />
          </BlurView>

          <TouchableOpacity style={styles.loginBtn} onPress={login}>
            <Text style={styles.loginText}>Next</Text>
          </TouchableOpacity>
        </>
      )}

      {state.stage === 1 && (
        <>
          <Text style={{ color: 'white' }}>
            Check your email for confirmation code
          </Text>
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='4 digit code...'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: 'validation', value: text })
              }
            />
          </BlurView>

          <TouchableOpacity style={styles.loginBtn} onPress={submitCode}>
            <Text style={styles.loginText}>Confirm</Text>
          </TouchableOpacity>
        </>
      )}

      {state.stage === 2 && (
        <>
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder='password...'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: 'password', value: text })
              }
            />
          </BlurView>

          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder='confirm password...'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: 'confirmPassword', value: text })
              }
            />
          </BlurView>

          <TouchableOpacity style={styles.loginBtn} onPress={changePassword}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {state.stage === 3 && (
        <>
          <Text>Password Changed</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
};

export default Forgot;
