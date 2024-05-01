import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Container = ({ expandedRow, toggleRowExpansion }) => {
    const navigation = useNavigation();

    const images = [
        require('../images/images/caphe.jpg'),
        require('../images/images/caosu.jpg'),
        require('../images/images/tieu.jpg'),
        require('../images/images/dieu.jpg'),
        require('../images/images/thong.jpg'),
        require('../images/images/mia.jpg'),
    ];

    const renderCardViews = () => {
        const cardViews = [];
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            const rowViews = [];
            for (let cardIndex = 0; cardIndex < 2; cardIndex++) {
                const index = rowIndex * 2 + cardIndex;
                const isExpanded = index === expandedRow;
                rowViews.push(
                    <TouchableOpacity
                        key={index}
                        style={[styles.cardView, isExpanded && styles.expandedCard]}
                        onPress={() => toggleRowExpansion(index)}
                        disabled={isExpanded}
                    >
                        <ImageBackground source={images[index]} style={styles.imageBackground}>
                            {isExpanded && (
                                <>
                                    <View style={styles.rowInCardView}>
                                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PlantTheTree')}>
                                            <Image source={require('../images/icons/plant.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('WaterTheTree')}>
                                            <Image source={require('../images/icons/water.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowInCardView}>
                                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PlantPreservation')}>
                                            <Image source={require('../images/icons/shield.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PlantPackaging')}>
                                            <Image source={require('../images/icons/package.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </ImageBackground>
                    </TouchableOpacity>
                );
            }
            cardViews.push(
                <View key={rowIndex} style={styles.rowInContainer}>
                    {rowViews}
                </View>
            );
        }
        return cardViews;
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={{ fontSize: 22, marginBottom: 10, color: 'red', fontWeight: 'bold' }}>Nổi bật</Text>
                </View>
                {renderCardViews()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 10,
        overflow: 'hidden'
    },
    expandedCard: {
        height: 250,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowInCardView: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    menuItem: {
        width: '50%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    icon: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
        tintColor: 'white'
    },
});

export default Container;
