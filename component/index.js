import React, { Component } from 'react'
import {
    View, Text, SafeAreaView
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './login/Login';
import Home from './home/Home';
import Weather from './weather/Weather';
import Price from './price/Price';
import Account from './account/Account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Weather" component={Weather} />
      <Tab.Screen name="Price" component={Price} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default RootComponent = function () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Weather" component={Weather} />
                <Stack.Screen name="Price" component={Price} />
                <Stack.Screen name="Account" component={Account} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}