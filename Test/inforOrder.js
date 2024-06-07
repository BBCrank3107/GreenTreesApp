import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

const InforOrder = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* <BackBtn></BackBtn> */}
            <View style={styles.header}>
                {/* <BackBtn></BackBtn> */}
                <Text style={[styles.textBold, {fontSize: 24}]}>Thông tin đơn hàng</Text>
            </View>
            <View style={styles.inforAddress}>
                <View style={styles.areaIcon}>
                    <Image source={require('../images/icons/address.png')} style={styles.icon}></Image>
                </View>
                <View style={styles.address}>
                    <Text style={[styles.textBold, { paddingVertical: 10 }]}>Địa chỉ nhận hàng</Text>
                    <Text style={styles.text}>Nguyễn Văn Bình</Text>
                    <Text style={styles.text}>0394865791</Text>
                    <Text style={styles.text}>470 Trần Đại Nghĩa, Hòa Quý, Ngũ Hành Sơn, Đà Nẵng</Text>
                </View>
            </View>
            <View style={styles.productWait}>
                <View style={styles.productInfo}>
                    <View style={styles.areaImage}>
                        <Image
                            style={styles.imageProduct}
                            source={{
                                uri: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/129-512.png",
                            }}
                        />
                    </View>
                    <View style={styles.areaName}>
                        <Text style={styles.textProduct}>
                            LOG san pham lau nha tien loi lam
                        </Text>
                        <Text style={styles.text}>x1</Text>
                        <Text style={styles.textPrice}> 20.000 VNĐ </Text>
                    </View>
                </View>
                <View style={styles.productInfo}>
                    <View style={styles.areaImage}>
                        <Image
                            style={styles.imageProduct}
                            source={{
                                uri: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/129-512.png",
                            }}
                        />
                    </View>
                    <View style={styles.areaName}>
                        <Text style={styles.textProduct}>
                            LOG san pham lau nha tien loi lam
                        </Text>
                        <Text style={styles.text}>x1</Text>
                        <Text style={styles.textPrice}> 20.000 VNĐ </Text>
                    </View>
                </View>
                <View style={styles.payment}>
                    <Text style={styles.textBold}>Thành tiền: 40.000 VNĐ</Text>
                    <Text style={styles.textBold}>Phí vận chuyển: 20.000 VNĐ</Text>
                    <Text style={styles.textBold}>Tổng thanh toán: 60.000 VNĐ</Text>
                </View>
                <View style={styles.method}>
                    <View style={styles.areaIcon}>
                        <Image source={require('../images/icons/payment.png')} style={styles.icon}></Image>
                    </View>
                    <View style={styles.address}>
                        <Text style={[styles.textBold, { paddingVertical: 10 }]}>Phương thức thanh toán</Text>
                        <Text style={styles.text}>Thanh toán khi nhận hàng</Text>
                    </View>
                </View>
                <View style={styles.inforOrder}>
                    <View style={styles.label}>
                        <Text style={styles.textBold}>Mã đơn hàng</Text>
                        <Text style={styles.text}>Thời gian đặt hàng</Text>
                    </View>
                    <View style={styles.infor}>
                        <Text style={styles.textBold}>000000000000</Text>
                        <Text style={styles.text}>2024-06-06 19:00:00</Text>
                    </View>
                </View>
                <View style={styles.areaBtn}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={[styles.textBold, { color: 'white' }]}>Hủy đơn hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default InforOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        padding: 20
    },
    inforAddress: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
        borderWidth: 0.2
    },
    areaIcon: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        paddingVertical: 10
    },
    icon: {
        width: 24,
        height: 24
    },
    address: {
        width: '90%',
        height: '100%',
    },
    textBold: {
        fontSize: 18,
        fontWeight: "500",
        color: 'black',
    },
    text: {
        fontSize: 16,
        color: 'gray'
    },
    productWait: {
        width: "100%",
    },
    productInfo: {
        width: "100%",
        height: 110,
        padding: 10,
        flexDirection: "row",
        borderBottomWidth: 0.2
    },
    areaImage: {
        height: '100%',
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
    },
    imageProduct: {
        width: 80,
        height: 80,
    },
    areaName: {
        height: 100,
        width: "70%",
        alignItems: "flex-end",
    },
    textProduct: {
        fontSize: 18,
        textAlign: "left",
        color: 'black'
    },
    textPrice: {
        fontSize: 18,
        color: "green",
    },
    payment: {
        width: "100%",
        height: 90,
        padding: 10,
        alignItems: "flex-end",
        borderBottomWidth: 0.2,
        borderBottomColor: "gray",
    },
    textPayment: {
        fontSize: 18,
    },
    method: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "gray",
    },
    inforOrder: {
        width: '100%',
        flexDirection: 'row',
        padding: 10
    },
    label: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    infor: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    areaBtn: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    btn: {
        width: 200,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
