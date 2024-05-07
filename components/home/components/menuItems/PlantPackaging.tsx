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
    harvest: string;
    preserve: string;
}

const PlantPackaging = ({ navigation }: any) => {
    const route = useRoute();
    const { harvest, preserve } = route.params as RouteParams;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg4.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <BackBtn onPress={() => navigation.navigate('HomeTabs')} />

                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Image source={require('../../images/images/menu4.png')} style={styles.img} />
                            <Text style={styles.h1}>Thu hoạch và bảo quản:</Text>
                            <Text style={styles.h2}>1. Thu hoạch:</Text>
                            <Text style={styles.text}>{harvest}</Text>
                            <Text style={styles.h2}>2. Bảo quản:</Text>
                            <Text style={styles.text}>{preserve}</Text>
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

export default PlantPackaging;
