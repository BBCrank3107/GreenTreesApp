import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useAutoScroll from './js/autoScroll';
import ImageCarousel from './components/ImageCarousel';
import Container from './components/Container';

const Home = () => {
    const { imageList, stepCarousel, handleScroll } = useAutoScroll();
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRowExpansion = (index) => {
        setExpandedRow(index === expandedRow ? null : index);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <ImageCarousel imageList={imageList} stepCarousel={stepCarousel} handleScroll={handleScroll} />
                    <LinearGradient
                        colors={['rgba(19,82,0,1)', 'rgba(35,255,0,1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 1]}
                        style={styles.titleContainer}
                    >
                        <Text style={styles.title}>Chăm sóc cây trồng</Text>
                    </LinearGradient>
                    <Container expandedRow={expandedRow} toggleRowExpansion={toggleRowExpansion} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'Merriweather-Bold',
        fontSize: 26,
        color: 'white'
    },
});

export default Home;
