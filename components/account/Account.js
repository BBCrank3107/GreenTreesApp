import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const Account = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection:'column', width: '100%', height: '100%'}}>
                <View style={{width: '100%', height: "50%", justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Account Screen</Text>
                </View>
                <View style={{width: '100%', height: "50%", justifyContent:'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width:'60%', height:'30', backgroundColor:'blue', borderRadius: 30}}
                        onPress={() => {
                            navigation.navigate('Login')
                        }}
                    >
                        <Text style={{color: 'white', fontSize: 21, textAlign:'center'}}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Account;
