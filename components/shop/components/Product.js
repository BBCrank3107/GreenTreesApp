import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalColors } from '../../../styles/Colors';
import { ipAddress } from '../../../ip/ip';
import { useNavigation } from '@react-navigation/native';


const Product = ({ navigation }) => {
    const [productData, setProductData] = useState([]);
    navigation = useNavigation();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ipAddress}/product`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProductData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.areaProduct}>
            <View style={styles.container}>
                <View style={styles.productLeft}>
                    {productData.map((product, index) => {
                        if (product.ProductID % 2 !== 0) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.product}
                                    onPress={() => navigation.navigate('InfoProduct', {
                                        productInfo: product.ProductInfo,
                                        productName: product.ProductName,
                                        productImage: product.Image,
                                        productPrice: product.Price,
                                        productPlantID: product.PlantID,
                                        productData: productData.filter(item => item.ProductID !== product.ProductID)
                                    })}
                                >
                                    <View style={styles.areaImg}>
                                        <Image source={{ uri: `${product.Image}` }} style={styles.img} />
                                    </View>
                                    <View style={styles.underImg}>
                                        <View style={styles.underLeftImg}>
                                            <Text style={styles.namePlant}>{product.ProductName}</Text>
                                            <Text style={styles.pricePlant}>{product.Price} VNĐ</Text>
                                        </View>
                                        <TouchableOpacity style={styles.underRightImg}>
                                            <Image
                                                style={styles.addProduct}
                                                source={require('../images/add.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            );
                        } else {
                            return null;
                        }
                    })}
                </View>
                <View style={styles.productRight}>
                    {productData.map((product, index) => {
                        if (product.ProductID % 2 === 0) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.product}
                                    onPress={() => navigation.navigate('InfoProduct', {
                                        productInfo: product.ProductInfo,
                                        productName: product.ProductName,
                                        productImage: product.Image,
                                        productPrice: product.Price,
                                        productPlantID: product.PlantID,
                                        productData: productData.filter(item => item.ProductID !== product.ProductID)
                                    })}
                                >
                                    <View style={styles.areaImg}>
                                        <Image source={{ uri: `${product.Image}` }} style={styles.img} />
                                    </View>
                                    <View style={styles.underImg}>
                                        <View style={styles.underLeftImg}>
                                            <Text style={styles.namePlant}>{product.ProductName}</Text>
                                            <Text style={styles.pricePlant}>{product.Price} VNĐ</Text>
                                        </View>
                                        <TouchableOpacity style={styles.underRightImg}>
                                            <Image
                                                style={styles.addProduct}
                                                source={require('../images/add.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            );
                        } else {
                            return null;
                        }
                    })}
                </View>
            </View>
        </View>
    );
}

export default Product;

const styles = StyleSheet.create({
    areaProduct: {
        marginTop: 10,
        paddingHorizontal: 5,
        marginBottom: 90
    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    productLeft: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        alignItems: 'center'
    },
    productRight: {
        flexDirection: 'column',
        width: '50%',
        alignItems: 'center'
    },
    product: {
        width: "90%",
        height: 230,
        backgroundColor: "#F8FAF5",
        borderRadius: 15,
        elevation: 2,
        overflow: 'hidden',
        marginVertical: 10
    },
    areaImg: {
        width: '100%',
        height: 160,
        overflow: 'hidden',
        borderBottomEndRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    underImg: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    addProduct: {
        width: 25,
        height: 25,
    },
    namePlant: {
        fontSize: 17,
        color: "gray",
        fontWeight: "500",
    },
    pricePlant: {
        fontSize: 16,
        color: "green",
        fontWeight: "500",
    },
    underLeftImg: {
        flexDirection: 'column',
    },
})