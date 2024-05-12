import React from 'react';
import { View, Image, TextInput, StatusBar, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../styles/Colors';

const Header = () => {
    return (
        <View>
            <View style={styles.areaLogo}>
                <View style={styles.logo}>
                    <Image
                        source={require("../images/logo.jpg")}
                        style={styles.imgLogo}
                    />
                </View>
                <View style={styles.user}>
                    <Image
                        source={require("../images/user.png")}
                        style={styles.imgUser}
                    />
                </View>
            </View>
            <StatusBar style="auto" />
            <View style={styles.title}>
                <Text style={styles.titleH1}>CÂY GIỐNG XANH</Text>
            </View>
            <View style={styles.areaInput}>
                <Image
                    style={styles.searchIcon}
                    source={require("../images/search.png")}
                />
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
    user: {
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
    imgUser: {
        width: 40,
        height: 40,
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

export default Header;
