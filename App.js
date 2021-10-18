import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Amplify } from 'aws-amplify'
import { useRecoilState, RecoilRoot } from 'recoil'
import { loggedInUserData } from './utils/state'

import Login from './screens/login/Login'
import SignUp from './screens/login/SignUp'
import Forgot from './screens/login/Forgot'
import Home from './screens/Home'
Amplify.configure({
  aws_project_region: 'eu-west-1',
  aws_cognito_identity_pool_id:
    'eu-west-1:3f5f916d-2252-487f-99c0-7aa69115f973',
  aws_cognito_region: 'eu-west-1',
  aws_user_pools_id: 'eu-west-1_T6v05tjzh',
  aws_user_pools_web_client_id: 'eqlretnsetkj5p57bqtandjqa',
  oauth: {}
})

const Stack = createStackNavigator()
function Routes () {
  const [user, setUser] = useRecoilState(loggedInUserData)

  const options = {
    headerStyle: {
      backgroundColor: '#FABAB8',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: '100'
    }
  }

  useEffect(() => {
    async function mount () {
      const prevStorage = await AsyncStorage.getItem('user')
      const userStorage = prevStorage ? JSON.parse(prevStorage) : {}
      setUser(userStorage)
    }
    mount()
  }, [setUser])

  return !user.username ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Login'
          component={Login}
        />
        <Stack.Screen
          options={{ title: 'Sign Up', ...options }}
          name='SignUp'
          component={SignUp}
        />
        <Stack.Screen
          options={{ title: 'Forgot Password', ...options }}
          name='Forgot'
          component={Forgot}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen
          options={{ title: 'Home' }}
          name='Home'
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const App = () => (
  <RecoilRoot>
    <Routes />
  </RecoilRoot>
)

export default App
