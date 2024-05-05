import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlantPackaging = () => {
    const route = useRoute();
    const { harvest, preserve } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg4.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'column', width: '100%', height: '100%', padding: 20 }}>
                        <Text style={styles.h1}>IV. Thu hoạch và bảo quản:</Text>
                        <Text style={styles.h2}>1. Thu hoạch:</Text>
                        <Text style={styles.text}>{harvest}</Text>
                        <Text style={styles.h2}>2. Bảo quản:</Text>
                        <Text style={styles.text}>{preserve}</Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    h2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    h3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    text: {
        fontSize: 18,
        color: 'black'
    },
});

export default PlantPackaging;