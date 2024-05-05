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

const WaterTheTree = () => {
    const route = useRoute();
    const { water, fertilize } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg2.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'column', width: '100%', height: '100%', padding: 20 }}>
                        <Text style={styles.h1}>II. Tưới nước và bón phân:</Text>
                        <Text style={styles.h3}>a. Tưới nước:</Text>
                        <Text style={styles.text}>{water}</Text>
                        <Text style={styles.h3}>b. Bón phân:</Text>
                        <Text style={styles.text}>{fertilize}</Text>
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

export default WaterTheTree;