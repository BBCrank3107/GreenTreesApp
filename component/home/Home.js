import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const Home = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection:'column', width: '100%', height: '100%'}}>
                <View style={{width: '100%', height: "50%", justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Home Screen</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;
