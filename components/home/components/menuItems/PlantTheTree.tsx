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
import BackBtn from '../../../backBtn';

interface RouteParams {
    climate: string;
    land: string;
    target: string;
    time: string
}

const PlantTheTree = ({ navigation }: any) => {
    const route = useRoute();
    const { climate, land, target, time } = route.params as RouteParams;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg1.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <BackBtn onPress={() => navigation.navigate('HomeTabs')} />

                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Image source={require('../../images/images/menu1.jpg')} style={styles.img}/>
                            <Text style={styles.h1}>Chọn giống và thời điểm trồng:</Text>
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
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginHorizontal: 20,
        marginBottom: 20,
        elevation: 10
    },
    content: {
        padding: 20,
    },
    img: {
        width: '100%',
        height: 300
    },
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