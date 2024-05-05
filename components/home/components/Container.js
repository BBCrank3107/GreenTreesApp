import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Container = ({ expandedRow, toggleRowExpansion, plantData }) => {
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
        const rows = [];
        for (let i = 0; i < plantData.length; i += 2) {
            const rowData = [];
            for (let j = i; j < Math.min(i + 2, plantData.length); j++) {
                const data = plantData[j];
                const isExpanded = data.InforID === expandedRow;
                rowData.push(
                    <TouchableOpacity
                        key={data.InforID}
                        style={[styles.cardView, isExpanded && styles.expandedCard]}
                        onPress={() => toggleRowExpansion(data.InforID)}
                        disabled={isExpanded}
                    >
                        <ImageBackground source={images[j]} style={styles.imageBackground}>
                            {isExpanded && (
                                <>
                                    <View style={styles.rowInCardView}>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => navigation.navigate('PlantTheTree', {
                                                climate: data.Climate,
                                                land: data.Land,
                                                target: data.Target,
                                                time: data.Time
                                            })}
                                        >
                                            <Image source={require('../images/icons/plant.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => navigation.navigate('WaterTheTree', {
                                                water: data.Water,
                                                fertilize: data.Fertilize
                                            })}
                                        >
                                            <Image source={require('../images/icons/water.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowInCardView}>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => navigation.navigate('PlantPreservation', {
                                                grass: data.Grass,
                                                insect: data.Insect,
                                                disease: data.Disease
                                            })}
                                        >
                                            <Image source={require('../images/icons/shield.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => navigation.navigate('PlantPackaging', {
                                                harvest: data.Harvest,
                                                preserve: data.Preserve
                                            })}
                                        >
                                            <Image source={require('../images/icons/package.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </ImageBackground>
                    </TouchableOpacity>
                );
            }
            rows.push(
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    {rowData}
                </View>
            );
        }
        return rows;
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
    plantIDText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
});

export default Container;
