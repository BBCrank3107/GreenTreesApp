import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { globalColors } from '../../styles/Colors';
import BackBtn from '../backBtn';
import { ipAddress } from '../../ip/ip';

const Price = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const getCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()}`;
        return formattedDate;
    }

    useEffect(() => {
        fetchData();
        const timerID = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => clearInterval(timerID);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ipAddress}/category/plants`);
            const jsonData = await response.json();

            const groupedData = groupByCategoryName(jsonData);
            setData(groupedData);
        } catch (error) {
            console.error(error);
        }
    };

    const groupByCategoryName = (data) => {
        const groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.CategoryName]) {
                groupedData[item.CategoryName] = [];
            }
            groupedData[item.CategoryName].push(item);
        });
        return groupedData;
    };

    const renderPlantItem = ({ item }) => {
        const fluctuationColor = item.Fluctuations < 0 ? styles.redText : styles.greenText;

        if (item.AVGPriceNow !== null && item.AVGPriceYesterday !== null) {
            return (
                <View style={styles.row}>
                    <Text style={[styles.label, styles.plantName]}>{item.PlantName}</Text>
                    <Text style={[styles.label, styles.price, fluctuationColor]}>{item.AVGPriceNow}</Text>
                    <Text style={[styles.label, styles.fluctuations, fluctuationColor]}>{item.Fluctuations}</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    const renderCategoryCard = ({ item: { categoryName, plants } }) => (
        <View key={categoryName} style={styles.card}>
            <Text style={styles.titleTable}>{categoryName}</Text>
            <View style={styles.table}>
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.label, styles.header, styles.plantName]}>Loại cây</Text>
                    <Text style={[styles.label, styles.header, styles.price]}>Giá</Text>
                    <Text style={[styles.label, styles.header, styles.fluctuations]}>Biến động</Text>
                </View>
                <FlatList
                    data={plants}
                    renderItem={renderPlantItem}
                    keyExtractor={(plant) => plant.PlantID.toString()}
                />
            </View>
        </View>
    );

    return (
        <View style={{flex: 1, backgroundColor: '#fffff3',}}>
            <BackBtn onPress={() => { navigation.navigate('Account') }}></BackBtn>
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Text style={styles.title}>
                        Giá cả hôm nay - {getCurrentDate()}
                    </Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ textAlign: 'right', fontSize: 16 }}>
                        {currentTime.toLocaleTimeString()}
                    </Text>
                </View>
                <FlatList
                    data={Object.keys(data).map(categoryName => ({ categoryName, plants: data[categoryName] }))}
                    renderItem={renderCategoryCard}
                    keyExtractor={(item) => item.categoryName}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    containerTop: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: globalColors.mainGreen,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    titleTable: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: globalColors.mainGreen,
    },
    plantName: {
        flex: 1,
        fontSize: 16
    },
    price: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16
    },
    fluctuations: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    headerRow: {
        backgroundColor: '#f0f0f0',
    },
    header: {
        color: 'black',
    },
    table: {
        width: '100%',
    },
    redText: {
        color: 'red',
    },
    greenText: {
        color: 'green',
    },
});

export default Price;
