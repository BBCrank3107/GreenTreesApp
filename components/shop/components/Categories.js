import React, { useState, useEffect } from "react";
import {
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    View,
} from "react-native";
import { globalColors } from "../../../styles/Colors";
import { ipAddress } from "../../../ip/ip";

const Categories = ({ onCategoryChange, categoriesData, selectedCategory }) => {
    const handleAllPress = () => {
        onCategoryChange("All");
    };

    const handleCategoryPress = (categoryID) => {
        onCategoryChange(categoryID);
    };

    return (
        <View>
            <View style={styles.category}>
                <Text style={styles.textCate}>Danh mục</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.showCategory}>
                        <TouchableOpacity
                            style={[
                                styles.btncate,
                                selectedCategory === "All" && {
                                    backgroundColor: globalColors.mainGreen,
                                },
                            ]}
                            onPress={handleAllPress}
                        >
                            <Text
                                style={[
                                    styles.textcategrory,
                                    selectedCategory === "All" && { color: "white" },
                                ]}
                            >
                                All
                            </Text>
                        </TouchableOpacity>

                        {categoriesData.map((category, index) => (
                            <TouchableOpacity
                                key={category.CategoryID}
                                style={[
                                    styles.btncate,
                                    selectedCategory === category.CategoryID && {
                                        backgroundColor: globalColors.mainGreen,
                                    },
                                    index === categoriesData.length - 1 && { marginRight: 15 },
                                ]}
                                onPress={() => handleCategoryPress(category.CategoryID)}
                            >
                                <Text
                                    style={[
                                        styles.textcategrory,
                                        selectedCategory === category.CategoryID && {
                                            color: "white",
                                        },
                                    ]}
                                >
                                    {category.CategoryName}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    category: {
        width: "100%",
        height: 90,
        flexDirection: "column",
        marginBottom: 5,
    },
    textCate: {
        height: "40%",
        marginLeft: 15,
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
        color: globalColors.mainGreen,
    },
    showCategory: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    btncate: {
        marginLeft: 15,
        padding: 12,
        borderRadius: 20,
        backgroundColor: "rgb(241, 244, 242)",
    },
    textcategrory: {
        color: "gray",
        fontWeight: "500",
        fontSize: 14,
    },
});
