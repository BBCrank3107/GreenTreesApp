import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
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

    const [plantData, setPlantData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.1.3:3000/infor');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPlantData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('./images/images/bg5.jpg')} resizeMode='cover' style={{height: '100%'}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <ImageCarousel imageList={imageList} stepCarousel={stepCarousel} handleScroll={handleScroll} />
                        <View
                            style={styles.titleContainer}
                        >
                            <Text style={styles.title}>Chăm sóc cây trồng</Text>
                        </View>
                        <Container expandedRow={expandedRow} toggleRowExpansion={toggleRowExpansion} plantData={plantData} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        width: '90%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#109672',
        borderRadius: 10,
        top: -10
    },
    title: {
        fontFamily: 'Merriweather-Bold',
        fontSize: 26,
        color: 'white'
    },
});

export default Home;
