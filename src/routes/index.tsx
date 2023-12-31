import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Form } from '../screens/Form';
import { Preview } from '../screens/Preview';
import { Detail } from '../screens/Detail'

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="Preview"
          component={Preview} 
        />
        <Screen
          name="Home"
          component={Home}
        />
        <Screen
          name="Form"
          component={Form}
        />

        <Screen 
          name="Detail"
          component={Detail}
        />
      </Navigator>
    </NavigationContainer>
  )
}