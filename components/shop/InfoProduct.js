import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import BackBtn from "../backBtn";
import HeartBtn from "../heartBtn";
import ProductSimilar from "./ProductSimilar";
import { globalColors } from "../../styles/Colors";

export default function InfoProduct({ route, navigation }) {
    const { productInfo, productName, productImage, productPrice, productPlantID, productData, userID } = route.params;

    const [quantity, setQuantity] = useState(1);

    // Hàm xử lý tăng số lượng
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Hàm xử lý giảm số lượng
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topHeader}>
                    <BackBtn onPress={() => navigation.navigate('HomeTabs', { screen: 'Shop', params: { userID } })} userID={userID} />
                    <Text>UserID: {userID}</Text>
                    <HeartBtn />
                </View>
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

                <ProductSimilar productData={route.params.productData} plantID={productPlantID} navigation={navigation} userID={userID}/>
            </ScrollView>
            <View style={styles.bottom}>
                <View style={styles.areaPricePlant}>
                    <Text style={styles.pricePlant}>{productPrice} VNĐ</Text>
                    <View style={styles.areaQuantity}>
                        {/* Button giảm số lượng */}
                        <TouchableOpacity style={styles.btnUpAnDown} onPress={decreaseQuantity}>
                            <Text style={styles.textBtnUpAnDown}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.areaTextQuantity}>
                            {/* Hiển thị số lượng */}
                            <TextInput style={styles.textQuantity}>{quantity}</TextInput>
                        </View>
                        {/* Button tăng số lượng */}
                        <TouchableOpacity style={styles.btnUpAnDown} onPress={increaseQuantity}>
                            <Text style={styles.textBtnUpAnDown}>+</Text>
                        </TouchableOpacity>
                    </View>
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
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    },
    areaPricePlant: {
        width: "40%",
    },
    areaAddtocard: {
        width: "60%",
    },
    pricePlant: {
        fontSize: 22,
        color: "red",
        fontWeight: "500",
    },
    areaQuantity: {
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnUpAnDown: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColors.mainGreen,
        borderRadius: 12
    },
    textBtnUpAnDown: {
        fontSize: 24,
        paddingBottom: 3,
        color: 'white',
        position: 'absolute'
    },
    areaTextQuantity: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textQuantity: {
        fontSize: 20,
        height: 50,
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
