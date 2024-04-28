import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import useAutoScroll from './js/autoScroll';
import ImageCarousel from './components/ImageCarousel';

const Home = () => {
    const { imageList, stepCarousel, handleScroll } = useAutoScroll();
    const [expandedRow, setExpandedRow] = useState(null);
    const [showBox, setShowBox] = useState(false);

    const toggleRowExpansion = (index) => {
        setExpandedRow(index === expandedRow ? null : index);
    };

    const toggleBox = () => {
        setShowBox(!showBox);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <ImageCarousel imageList={imageList} stepCarousel={stepCarousel} handleScroll={handleScroll} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Chăm sóc cây trồng</Text>
                    </View>
                    <View style={styles.outerContainer}>
                        <View style={styles.innerContainer}>
                            <View>
                                <Text style={{ fontSize: 20, marginBottom: 10 }}>Nổi bật</Text>
                            </View>
                            {[0, 1, 2].map((rowIndex) => (
                                <View key={rowIndex} style={styles.rowInContainer}>
                                    {[0, 1].map((cardIndex) => {
                                        const index = rowIndex * 2 + cardIndex;
                                        const isExpanded = index === expandedRow;
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={[styles.cardView, isExpanded && styles.expandedCard]}
                                                onPress={() => toggleRowExpansion(index)}
                                                disabled={isExpanded}
                                            >
                                                {isExpanded && (
                                                    <>
                                                        <View style={styles.rowInCardView}>
                                                            <TouchableOpacity style={styles.menuItem} onPress={toggleBox}>
                                                                <Image source={require('./images/icons/plant.png')} style={styles.icon} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={styles.menuItem} onPress={toggleBox}>
                                                                <Image source={require('./images/icons/water.png')} style={styles.icon} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.rowInCardView}>
                                                            <TouchableOpacity style={styles.menuItem} onPress={toggleBox}>
                                                                <Image source={require('./images/icons/shield.png')} style={styles.icon} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={styles.menuItem} onPress={toggleBox}>
                                                                <Image source={require('./images/icons/package.png')} style={styles.icon} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </>
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={[styles.boxOverlay, showBox ? styles.showOverlay : styles.hideOverlay]}>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={toggleBox} style={styles.closeButton}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableOpacity>
                            {/* Nội dung của box */}
                        </View>
                    </View>
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
        backgroundColor: 'green',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'Merriweather-Regular',
        fontSize: 24,
    },
    outerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 30
    },
    innerContainer: {
        width: '90%',
        height: '96%',
    },
    rowInContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardView: {
        width: '48%',
        height: 250,
        backgroundColor: 'red',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden'
    },
    expandedCard: {
        height: 250,
    },
    rowInCardView: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    menuItem: {
        width: '50%',
        height: '100%',
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    },
    boxOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    showOverlay: {
        display: 'flex',
    },
    hideOverlay: {
        display: 'none',
    },
    box: {
        backgroundColor: 'white',
        padding: 20,
        width: '70%',
        height: '70%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeText: {
        fontSize: 20,
    },
});

export default Home;
