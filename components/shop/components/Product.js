import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Product = () => {
    return (
        <View style={styles.areaPlant}>
            <View style={styles.plantAb}>
                <View style={styles.abLeft}>
                    <Image source={require("../images/test.png")}></Image>
                    <View style={styles.underImg}>
                        <View style={styles.underRightImg}>
                            <View>
                                <Text style={styles.namePlant}>Cây lúa</Text>
                            </View>
                            <View>
                                <Text style={styles.pricePlant}>$20.00</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.underLeftImg}>
                            <Image
                                style={styles.addPlant}
                                source={require("../images/add.png")}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.abLeft}>
                    <Image source={require("../images/test.png")}></Image>
                    <View style={styles.underImg}>
                        <View style={styles.underRightImg}>
                            <View>
                                <Text style={styles.namePlant}>Cây lúa</Text>
                            </View>
                            <View>
                                <Text style={styles.pricePlant}>$20.00</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.underLeftImg}>
                            <Image
                                style={styles.addPlant}
                                source={require("../images/add.png")}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.plantUnd}>
                <View style={styles.abLeft}>
                    <Image source={require("../images/test.png")}></Image>
                    <View style={styles.underImg}>
                        <View style={styles.underRightImg}>
                            <View>
                                <Text style={styles.namePlant}>Cây lúa</Text>
                            </View>
                            <View>
                                <Text style={styles.pricePlant}>$20.00</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.underLeftImg}>
                            <Image
                                style={styles.addPlant}
                                source={require("../images/add.png")}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.abLeft}>
                    <Image source={require("../images/test.png")}></Image>
                    <View style={styles.underImg}>
                        <View style={styles.underRightImg}>
                            <View>
                                <Text style={styles.namePlant}>Cây lúa</Text>
                            </View>
                            <View>
                                <Text style={styles.pricePlant}>$20.00</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.underLeftImg}>
                            <Image
                                style={styles.addPlant}
                                source={require("../images/add.png")}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Product;

const styles = StyleSheet.create({
    areaPlant :{
        marginBottom: 100
    },
    plantAb: {
        width: "100%",
        height: 230,
        flexDirection: "row",
    },
    plantUnd: {
        width: "100%",
        height: 230,
        flexDirection: "row",
        marginTop: 15,
    },
    abLeft: {
        width: "44%",
        height: "100%",
        paddingTop: 15,
        paddingLeft: 15,
        backgroundColor: "#F8FAF5",
        borderRadius: 15,
        marginLeft: 15,
    },
    abRight: {
        width: "50%",
        height: "100%",
        paddingTop: 10,
    },
    underImg: {
        width: "100%",
        height: 40,
        flexDirection: "row",
    },
    addPlant: {
        width: 22,
        height: 22,
        marginLeft: 9,
        marginTop: 10,
    },
    namePlant: {
        fontSize: 17,
        color: "gray",
        fontWeight: "500",
        marginTop: -2,
    },
    pricePlant: {
        fontSize: 16,
        color: "green",
        fontWeight: "500",
    },
    underRightImg: {
        width: "70%",
        height: "100%",
    },
})