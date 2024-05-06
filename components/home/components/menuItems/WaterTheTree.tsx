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
    water: string;
    fertilize: string;
}

const WaterTheTree = ({navigation}: any) => {
    const route = useRoute();
    const { water, fertilize } = route.params as RouteParams;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg2.jpg')} resizeMode='cover' style={{ height: '100%' }}>
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