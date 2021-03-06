import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { BlurView } from 'expo-blur';
import { loggedInUserData } from '../../utils/state';
import Error from './Error';
import styles from './styles';
import Layout from '../../layout/LayoutLogin';

const Login = ({ navigation }) => {
  const [user, setUser] = useRecoilState(loggedInUserData);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const login = async () => {
    try {
      await Auth.signIn(username, password);
      const user1 = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      const userInfo = {
        ...user1.attributes,
        username: user1.username,
        token: session.accessToken.jwtToken,
        refreshtoken: session.refreshToken.token,
      };
      setUser(userInfo);
      AsyncStorage.setItem('user', JSON.stringify(userInfo));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Layout>
      {error && <Error errorMessage={error} />}
      <BlurView intensity={80} tint='light' style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='username'
          placeholderTextColor='black'
          autoCapitalize='none'
          onChangeText={text => setUsername(text)}
        />
      </BlurView>
      <BlurView intensity={80} tint='light' style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder='password'
          placeholderTextColor='black'
          onChangeText={text => setPassword(text)}
        />
      </BlurView>
      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 5 }}>
        <Text onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default Login;
