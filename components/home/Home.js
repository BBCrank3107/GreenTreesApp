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
            </View>
        </SafeAreaView>
    );
};

export default Home;
