import React, { Component } from 'react'
import {
    Image, StyleSheet,
    View
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {globalColors} from '../styles/Colors'

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
    const tabBarIconStyle = (focused) => ({
        backgroundColor: focused ? 'white' : globalColors.mainGreen,
        elevation: focused ? 5 : 0
    });

    const tabBarIconTintColor = (focused) => ({
        tintColor: focused ? 'gray' : 'white'
    });

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                // tabBarStyle: [{ display: 'flex' }, null],
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 10,
                    height: 60,
                    borderRadius: 30,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    backgroundColor: globalColors.mainGreen
                },
                tabBarShowLabel: false,
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.backgroundIcon, tabBarIconStyle(focused)]}>
                        <Image
                            source={require('../images/icons/home.png')}
                            style={[styles.tabBarIcon, tabBarIconTintColor(focused)]}
                            resizeMode='stretch'
                        />
                    </View>
                ),
            }} />
            <Tab.Screen name="Weather" component={Weather} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.backgroundIcon, tabBarIconStyle(focused)]}>
                        <Image
                            source={require('../images/icons/weather.png')}
                            style={[styles.tabBarIcon, tabBarIconTintColor(focused)]}
                            resizeMode='stretch'
                        />
                    </View>
                ),
            }} />
            <Tab.Screen name="Shop" component={Shop} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.main, { backgroundColor: focused ? globalColors.mainGreen : 'white' }]}>
                        <View style={[{ width: 54, height: 54, borderRadius: 27, justifyContent: 'center', alignItems: 'center' }, tabBarIconStyle(focused)]}>
                            <Image
                                source={require('../images/icons/shop.png')}
                                style={[styles.tabBarIcon, tabBarIconTintColor(focused), styles.center]}
                                resizeMode='stretch'
                            />
                        </View>
                    </View>
                ),
            }} />
            <Tab.Screen name="Price" component={Price} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.backgroundIcon, tabBarIconStyle(focused)]}>
                        <Image
                            source={require('../images/icons/price.png')}
                            style={[styles.tabBarIcon, tabBarIconTintColor(focused)]}
                            resizeMode='stretch'
                        />
                    </View>
                ),
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.backgroundIcon, tabBarIconStyle(focused)]}>
                        <Image
                            source={require('../images/icons/account.png')}
                            style={[styles.tabBarIcon, tabBarIconTintColor(focused)]}
                            resizeMode='stretch'
                        />
                    </View>
                ),
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
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -15,
        elevation: 10
    },
    center: {
        width: 32,
        height: 32
    },
    backgroundIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
});