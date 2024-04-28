import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import useAutoScroll from './js/autoScroll';
import ImageCarousel from './components/ImageCarousel';

const Home = ({ navigation }) => {
    const { imageList, stepCarousel, handleScroll } = useAutoScroll();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ImageCarousel imageList={imageList} stepCarousel={stepCarousel} handleScroll={handleScroll} />
                <View style={{width: '100%', height: 100}}>
                    <Text style={{ fontFamily: 'Merriweather', fontSize: 24 }}>Chăm sóc cây trồng</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;
