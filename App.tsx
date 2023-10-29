import 'react-native-gesture-handler';
import * as React from 'react';

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './src/pages/Intro';
import Home from './src/pages/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark' backgroundColor='#FFF' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false, animationEnabled: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animationEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}