import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import { useRoute } from '@react-navigation/native';

interface RouteParams {
    climate: string;
    land: string;
    target: string;
    time: string
}

const PlantTheTree = ({navigation}: any) => {
    const route = useRoute();
    const { climate, land, target, time } = route.params as RouteParams;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg1.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <View style={{ height: 50, width: '100%', backgroundColor: '#d9d9d9', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => {
                            navigation.navigate('HomeTabs')
                        }}>
                        <Image style={{ height: 26, width: 26 }} source={require('../../../../images/icons/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Thông tin</Text>
                </View>
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