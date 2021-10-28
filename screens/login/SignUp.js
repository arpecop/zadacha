import React, { useState } from "react";

import { Auth } from "aws-amplify";

import { Text, TextInput, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import Error from "./Error";
import styles from "./styles";
import Layout from "../../layout/LayoutLogin";

const SignUp = ({ navigation }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    authCode: "",
    stage: 0,
    error: { name: "Empty" },
  });

  const handleUpdate = event => {
    setState({
      ...state,
      [event.target]: event.value,
    });
  };

  const signUp = async () => {
    const { username, password, email } = state;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      setState({ ...state, stage: 1, error: { name: "Empty" } });
      navigation.setOptions({ title: "Потвърди кода" });
    } catch (err) {
      setState({ ...state, error: err });
    }
  };

  const confirmSignUp = async () => {
    const { username, authCode } = state;
    try {
      await Auth.confirmSignUp(username, authCode);
      setState({ ...state, stage: 2, error: { name: "Empty" } });
    } catch (err) {
      setState({ ...state, error: err });
    }
  };
  return (
    <Layout>
      {state.stage === 0 && (
        <>
          {state.error && <Error errorMessage={state.error} />}
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='username'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: "username", value: text })
              }
            />
          </BlurView>
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder='password'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: "password", value: text })
              }
            />
          </BlurView>
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='email...'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: "email", value: text })
              }
            />
          </BlurView>
          <TouchableOpacity style={styles.loginBtn} onPress={signUp}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {state.stage === 1 && (
        <>
          {state.error && <Error errorMessage={state.error} />}
          <BlurView intensity={80} tint='dark' style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='auth code...'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={text =>
                handleUpdate({ target: "authCode", value: text })
              }
            />
          </BlurView>

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
  );
};

export default SignUp;
