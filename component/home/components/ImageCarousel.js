import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = ({ imageList, stepCarousel, handleScroll }) => {
    return (
        <View style={{ width: screenWidth, height: 200 }}>
            <ScrollView
                horizontal
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
    );
};

export default ImageCarousel;
