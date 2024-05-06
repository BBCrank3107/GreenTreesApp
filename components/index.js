import React, { Component } from 'react'
import {
    Image, StyleSheet
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './login/Login';
import Home from './home/Home';
import Weather from './weather/Weather';
import Price from './price/Price';
import Account from './account/Account';
import Shop from './shop/Shop';
import Container from './home/components/Container';
import PlantTheTree from './home/components/menuItems/PlantTheTree';
import WaterTheTree from './home/components/menuItems/WaterTheTree';
import PlantPreservation from './home/components/menuItems/PlantPreservation';
import PlantPackaging from './home/components/menuItems/PlantPackaging';
import ChangePass from './account/components/ChangePass';
import InfoAccount from './account/components/InfoAccount';
import Calculator from './account/components/calculator/Calculator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: [{ display: 'flex' }, null]
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../images/icons/home.png')}
                        style={[styles.tabBarIcon, { tintColor: focused ? 'black' : 'gray' }]}
                        resizeMode='stretch'
                    />
                ),
                tabBarLabel: ''
            }} />
            <Tab.Screen name="Weather" component={Weather} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../images/icons/weather.png')}
                        style={[styles.tabBarIcon, { tintColor: focused ? 'black' : 'gray' }]}
                        resizeMode='stretch'
                    />
                ),
                tabBarLabel: ''
            }} />
            <Tab.Screen name="Price" component={Price} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../images/icons/price.png')}
                        style={[styles.tabBarIcon, { tintColor: focused ? 'black' : 'gray' }]}
                        resizeMode='stretch'
                    />
                ),
                tabBarLabel: ''
            }} />
            <Tab.Screen name="Shop" component={Shop} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../images/icons/shop.png')}
                        style={[styles.tabBarIcon, { tintColor: focused ? 'black' : 'gray' }]}
                        resizeMode='stretch'
                    />
                ),
                tabBarLabel: ''
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../images/icons/account.png')}
                        style={[styles.tabBarIcon, { tintColor: focused ? 'black' : 'gray' }]}
                        resizeMode='stretch'
                    />
                ),
                tabBarLabel: ''
            }} />
        </Tab.Navigator>
    );
}

export default RootComponent = function () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="HomeTabs" component={MyTabs} />
                <Stack.Screen name="Container" component={Container} />
                <Stack.Screen name="PlantTheTree" component={PlantTheTree} />
                <Stack.Screen name="WaterTheTree" component={WaterTheTree} />
                <Stack.Screen name="PlantPreservation" component={PlantPreservation} />
                <Stack.Screen name="PlantPackaging" component={PlantPackaging} />
                <Stack.Screen name="ChangePass" component={ChangePass} />
                <Stack.Screen name="InfoAccount" component={InfoAccount} />
                <Stack.Screen name="Calculator" component={Calculator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 26,
        height: 26,
        marginTop: 15,
    },
});