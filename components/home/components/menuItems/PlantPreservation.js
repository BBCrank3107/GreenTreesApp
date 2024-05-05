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

const PlantPreservation = () => {
    const route = useRoute();
    const { grass, insect, disease } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../images/images/bg3.jpg')} resizeMode='cover' style={{ height: '100%' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'column', width: '100%', height: '100%', padding: 20 }}>
                        <Text style={styles.h1}>III. Cách bảo vệ cây:</Text>
                        <Text style={styles.text}>- Kiểm soát cỏ: {grass}</Text>
                        <Text style={styles.text}>- Kiểm soát côn trùng: {insect}</Text>
                        <Text style={styles.h2}>* Dấu hiệu bệnh trên cây và cách khắc phục</Text>
                        <Text style={styles.text}>{disease}</Text>
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

export default PlantPreservation;