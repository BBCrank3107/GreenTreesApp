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

const PlantTheTree = () => {
    const route = useRoute();
    const { climate, land, target, time } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg1.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'column', width: '100%', height: '100%', padding: 20 }}>
                        <Text style={styles.h1}>I. Chọn giống và thời điểm trồng:</Text>
                        <Text style={styles.h2}>1. Cách chọn giống:</Text>
                        <Text style={styles.h3}>a. Điều kiện khí hậu:</Text>
                        <Text style={styles.text}>{climate}</Text>
                        <Text style={styles.h3}>b. Đặc điểm đất:</Text>
                        <Text style={styles.text}>{land}</Text>
                        <Text style={styles.h3}>c. Mục tiêu kinh doanh:</Text>
                        <Text style={styles.text}>{target}</Text>
                        <Text style={styles.h2}>2. Thời điểm trồng:</Text>
                        <Text style={styles.text}>{time}</Text>
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

export default PlantTheTree;