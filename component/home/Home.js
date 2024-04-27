import React, { Component, useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Home = ({ navigation }) => {
    const [imageList, setImageList] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const stepCarousel = useRef(null);

    useEffect(() => {
        const data = [
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../images/images/imgHome/banner/image1.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            },
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../images/images/imgHome/banner/image2.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            },
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../images/images/imgHome/banner/image3.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            },
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../images/images/imgHome/banner/image4.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            }
        ];

        setImageList(data);
    }, []);

    useEffect(() => {
        if (imageList.length > 0) {
            let index = 0;
            setInterval(() => {
                stepCarousel.current.scrollTo({ x: index * screenWidth, y: 0, animated: true });
                index += 1;
                if (index === imageList.length) {
                    index = 0;
                }
            }, 2000);
        }
    }, [imageList]);

    const handleScroll = (e) => {
        if (!e) {
            return;
        }
        const { nativeEvent } = e;
        if (nativeEvent && nativeEvent.contentOffset) {
            let imageIndex = 0;
            if (nativeEvent.contentOffset.x > 0) {
                imageIndex = Math.floor((nativeEvent.contentOffset.x + screenWidth / 2) / screenWidth);
            }
            setCurrentImage(imageIndex);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Home Screen</Text>
                <View style={{ width: screenWidth, height: 200 }}>
                    <ScrollView
                        horizontal
                        // pagingEnabled
                        contentContainerStyle={{ width: screenWidth * imageList.length, height: 200 }}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        ref={stepCarousel}
                    >
                        {imageList.map((e, index) =>
                            <View key={index.toString()}>
                                {e.image}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;
