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
    water: string;
    fertilize: string;
}

const WaterTheTree = ({ navigation }: any) => {
    const route = useRoute();
    const { water, fertilize } = route.params as RouteParams;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg2.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <BackBtn onPress={() => navigation.navigate('HomeTabs')} />

                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Image source={require('../../images/images/menu2.jpg')} style={styles.img}/>
                            <Text style={styles.h1}>Tưới nước và bón phân:</Text>
                            <Text style={styles.h3}>a. Tưới nước:</Text>
                            <Text style={styles.text}>{water}</Text>
                            <Text style={styles.h3}>b. Bón phân:</Text>
                            <Text style={styles.text}>{fertilize}</Text>
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