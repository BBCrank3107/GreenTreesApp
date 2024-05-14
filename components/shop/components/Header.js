import React from 'react';
import { View, Image, TextInput, StatusBar, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalColors } from '../../../styles/Colors';
import { useNavigation } from '@react-navigation/native';

const Header = ({userID}) => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.areaLogo}>
                <View style={styles.logo}>
                    <Image
                        source={require("../images/logo.jpg")}
                        style={styles.imgLogo}
                    />
                </View>
                <View style={styles.cart}>
                    <TouchableOpacity
                        style={styles.btnCart}
                        onPress={() => {
                            navigation.navigate('ShopCart', { userID })
                        }}
                    >
                        <Image
                            source={require("../images/cart.png")}
                            style={styles.imgCart}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
            <View style={styles.title}>
                <Text style={styles.titleH1}>CÂY GIỐNG XANH</Text>
            </View>
            <View style={styles.areaInput}>
                <TouchableOpacity>
                    <Image
                        style={styles.searchIcon}
                        source={require("../images/search.png")}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Tìm kiếm"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <Image style={styles.baner} source={require("../images/baner.jpg")} />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    areaLogo: {
        width: "100%",
        height: 100,
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
    },
    logo: {
        width: "58%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    cart: {
        width: "42%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 15,
    },
    imgLogo: {
        width: 70,
        height: 70,
    },
    btnCart: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9'
    },
    imgCart: {
        width: 24,
        height: 24,
    },
    title: {
        width: "100%",
        height: 40,
        alignItems: "center",
    },
    titleH1: {
        fontSize: 22,
        fontWeight: "600",
        color: globalColors.mainGreen,
        marginBottom: 5,
    },
    areaInput: {
        width: "90%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.3,
        borderColor: globalColors.mainGreen,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginHorizontal: 20
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    inputSearch: {
        fontSize: 16,
        fontWeight: "500",
        color: "black",
        marginRight: 20,
    },
    baner: {
        width: 370,
        height: 100,
        borderRadius: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
});

