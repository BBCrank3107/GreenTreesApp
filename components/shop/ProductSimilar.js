import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductSimilar = ({ plantID, productData, navigation }) => {
    const similarProducts = productData.filter(product => product.PlantID === plantID);

    const restartInfoProduct = (product) => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'InfoProduct', params: {
                    productInfo: product.ProductInfo,
                    productName: product.ProductName,
                    productImage: product.Image,
                    productPrice: product.Price,
                    productPlantID: product.PlantID,
                    productData: productData.filter(item => item.ProductID !== product.ProductID)
                }
            }],
        });
    };

    return (
        <View style={styles.areaProductSimilar}>
            <Text style={styles.detailTitle}>Sản phẩm tương tự</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.boxImgSimilar}>
                    {similarProducts.map((product, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.product}
                            onPress={() => restartInfoProduct(product)}
                        >
                            <View style={styles.areaImg}>
                                <Image source={{ uri: product.Image }} style={styles.img} />
                            </View>
                            <View style={styles.underImg}>
                                <View style={styles.underLeftImg}>
                                    <Text style={styles.namePlant}>{product.ProductName}</Text>
                                    <Text style={styles.pricePlant}>{product.Price} VNĐ</Text>
                                </View>
                                <TouchableOpacity style={styles.underRightImg}>
                                    <Image
                                        style={styles.addProduct}
                                        source={require('./images/add.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default ProductSimilar;

const styles = StyleSheet.create({
    areaProductSimilar: {
        width: "100%",
        height: 300,
    },
    boxImgSimilar: {
        width: "100%",
        flexDirection: "row",
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 10,
        marginLeft: 20,
    },
    product: {
        width: 172,
        height: 230,
        backgroundColor: "#F8FAF5",
        borderRadius: 15,
        elevation: 2,
        overflow: 'hidden',
        marginVertical: 10,
        marginLeft: 20
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
});

