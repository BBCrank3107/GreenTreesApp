import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { ipAddress } from "../../ip/ip";

const ProductSimilar = ({ plantID, userID, navigation }) => {
    const [productSimilar, setProductSimilar] = useState([]);

    useEffect(() => {
        if (plantID) {
            fetchData();
        }
    }, [plantID]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ipAddress}/products/byPlant/${plantID}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProductSimilar(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const restartInfoProduct = (product) => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "InfoProduct",
                    params: {
                        productInfo: product.ProductInfo,
                        productName: product.ProductName,
                        productImage: product.Image,
                        productPrice: product.Price,
                        productPlantID: product.PlantID,
                        productID: product.ProductID,
                        productStatus:product.Status,
                        userID: userID,
                    },
                },
            ],
        });
    };

    return (
        <View style={styles.areaProductSimilar}>
            <Text style={styles.detailTitle}>Sản phẩm tương tự</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.boxImgSimilar}>
                    {productSimilar.map((product, index) => (
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
                                        source={require("./images/add.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

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
        overflow: "hidden",
        marginVertical: 10,
        marginLeft: 20,
    },
    areaImg: {
        width: "100%",
        height: 160,
        overflow: "hidden",
        borderBottomEndRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: "100%",
        height: "100%",
    },
    underImg: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
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
        flexDirection: "column",
    },
    underRightImg: {
        justifyContent: "center",
        alignItems: "center",
    },
});
