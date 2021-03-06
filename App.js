import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Amplify } from 'aws-amplify';
import { useFonts } from 'expo-font';
import { useRecoilState, RecoilRoot } from 'recoil';
import { loggedInUserData } from './utils/state';
import Login from './screens/login/Login';
import SignUp from './screens/login/SignUp';
import Forgot from './screens/login/Forgot';
import Home from './screens/Home';

import Intro from './screens/Intro';

// import useStorage from './hooks/useStorage'

const TestRoute = () => <View />;

LogBox.ignoreLogs(['Setting a timer for a long period of time']); // ignore specific logs

Amplify.configure({
  aws_project_region: 'eu-west-1',
  aws_cognito_identity_pool_id:
    'eu-west-1:3f5f916d-2252-487f-99c0-7aa69115f973',
  aws_cognito_region: 'eu-west-1',
  aws_user_pools_id: 'eu-west-1_T6v05tjzh',
  aws_user_pools_web_client_id: 'eqlretnsetkj5p57bqtandjqa',
  oauth: {},
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Routes () {
  const [user, setUser] = useRecoilState(loggedInUserData);
  const [loaded] = useFonts({
    Assistant: require('./assets/fonts/Assistant.ttf'),
  });
  const options = {
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: '100',
      fontFamily: 'Assistant',
    },
  };

  useEffect(() => {
    async function mount () {
      const prevStorage = await AsyncStorage.getItem('user');
      const userStorage = prevStorage ? JSON.parse(prevStorage) : {};
      setUser(userStorage);
    }
    mount();
  }, []);
  // AsyncStorage.removeItem('user');
  return !user.username ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Intro'
          component={Intro}
        />
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
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: '#FABAB8',
          tabBarInactiveBackgroundColor: '#FABAB8',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      >
        <Tab.Screen
          tabBarShowLabel={false}
          options={{
            title: 'My home',
            ...options,
            navigationOptions: { title: 'Header title' },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-home' size={size} color={color} />
            ),
          }}
          name='Home'
          component={Home}
        />
        <Tab.Screen
          options={{
            title: 'Home',
            ...options,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-home' size={size} color={color} />
            ),
          }}
          name='Test'
          component={TestRoute}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const App = () => (
  <RecoilRoot>
    <Routes />
  </RecoilRoot>
);

export default App;
