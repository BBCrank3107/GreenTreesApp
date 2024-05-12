import BackBtn from "../backBtn";
import HeartBtn from "../heartBtn";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import ProductSimilar from "./ProductSimilar";
import { globalColors } from "../../styles/Colors";

export default function InfoProduct({ route, navigation }) {
    const { productInfo, productName, productImage, productPrice, productPlantID, productData } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* topHeader */}
                <View style={styles.topHeader}>
                    <BackBtn onPress={() => navigation.navigate('HomeTabs', { screen: 'Shop' })} />
                    <HeartBtn />
                </View>
                {/* endtophead */}
                <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.areaImage}>
                            <Image
                                style={styles.imgPlant}
                                source={{ uri: productImage }}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.namePlant}>
                        <Text style={styles.textName}>{productName}</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={{ fontSize: 20 }}>Tình trạng: </Text>
                        <View style={styles.boxState}>
                            <Text style={styles.textState}>Còn hàng</Text>
                        </View>
                    </View>

                    <View style={styles.areaDetail}>
                        {productInfo ? (
                            <Text style={styles.detailPlant}>{productInfo}</Text>
                        ) : (
                            <Text style={styles.detailPlant}>Chưa có thông tin cho sản phẩm này</Text>
                        )}
                    </View>
                </View>

                {/* sp tương tự */}
                <ProductSimilar productData={route.params.productData} plantID={productPlantID} navigation={navigation} />
            </ScrollView>
            {/* Add to cart area */}
            <View style={styles.bottom}>
                <View style={styles.areaPricePlant}>
                    <Text style={styles.text}>Giá:</Text>
                    <Text style={styles.pricePlant}>{productPrice} VNĐ</Text>
                </View>
                <View style={styles.areaAddtocard}>
                    <TouchableOpacity style={styles.btnContainer}>
                        <Text style={styles.btnText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topHeader: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    areaImage: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 330,
        overflow: "hidden",
    },
    imgPlant: {
        width: 330,
        height: 330,
        borderRadius: 100,
        marginHorizontal: 10,
    },
    namePlant: {
        width: "100%",
        height: 40,
        marginVertical: 10,
    },
    state: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    boxState: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    areaDetail: {
        width: "100%",
        borderRadius: 10,
        padding: 10,
        overflow: "hidden",
        backgroundColor: '#f0ecec',
        marginTop: 10
    },
    bottom: {
        width: "100%",
        height: 100,
        flexDirection: "row",
        padding: 20,
        backgroundColor: "#f0ecec",
        zIndex: 1,
        elevation: 10,
        alignItems: 'center',
    },
    areaPricePlant: {
        width: "40%",
    },
    areaAddtocard: {
        width: "60%",
    },
    text: {
        fontSize: 24,
        fontWeight: '500'
    },
    pricePlant: {
        fontSize: 24,
        color: "red",
        fontWeight: "700",
    },
    textName: {
        fontSize: 30,
        fontWeight: "500",
        color: globalColors.mainGreen,
        paddingHorizontal: 10,
        width: "100%",
    },
    textState: {
        fontSize: 24,
        fontWeight: "500",
        color: globalColors.mainGreen
    },
    detailPlant: {
        fontSize: 18,
        color: "#62626e",
        textAlign: 'justify',
    },
    btnContainer: {
        width: 220,
        height: 60,
        backgroundColor: globalColors.mainGreen,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
});
