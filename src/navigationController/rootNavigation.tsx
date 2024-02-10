import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashBoard from '../app/DashBoard';
import CharacterDetails from '../app/CharacterDetails';
import screenName from './screenName';

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screenName.DashBoard} component={DashBoard} />
      <Stack.Screen
        name={screenName.CharacterDetails}
        component={CharacterDetails}
      />
    </Stack.Navigator>
  );
}
