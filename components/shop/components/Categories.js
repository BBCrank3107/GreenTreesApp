import React, { useState } from 'react'
import { Text, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native'

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
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
                                    backgroundColor: "rgb(25, 108, 65)",
                                },
                            ]}
                            onPress={() => handleCategoryPress("All")}
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
                        <TouchableOpacity
                            style={[
                                styles.btncate,
                                selectedCategory === "AnQua" && {
                                    backgroundColor: "rgb(25, 108, 65)",
                                },
                            ]}
                            onPress={() => handleCategoryPress("AnQua")}
                        >
                            <Text
                                style={[
                                    styles.textcategrory,
                                    selectedCategory === "AnQua" && { color: "white" },
                                ]}
                            >
                                Cây ăn quả
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.btncate,
                                selectedCategory === "CongNghiep" && {
                                    backgroundColor: "rgb(25, 108, 65)",
                                },
                            ]}
                            onPress={() => handleCategoryPress("CongNghiep")}
                        >
                            <Text
                                style={[
                                    styles.textcategrory,
                                    selectedCategory === "CongNghiep" && { color: "white" },
                                ]}
                            >
                                Cây công nghiệp
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.btncate,
                                selectedCategory === "LuongThuc" && {
                                    backgroundColor: "rgb(25, 108, 65)",
                                },
                            ]}
                            onPress={() => handleCategoryPress("LuongThuc")}
                        >
                            <Text
                                style={[
                                    styles.textcategrory,
                                    selectedCategory === "LuongThuc" && { color: "white" },
                                ]}
                            >
                                Cây lương thực
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    category: {
        width: "100%",
        height: 90,
        flexDirection: "column",
    },
    textCate: {
        height: "30%",
        marginLeft: 20,
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
    },
    showCategory: {
        height: "80%",
        flexDirection: "row",
        alignItems: "center",
    },
    btncate: {
        marginLeft: 15,
        padding: 12,
        borderRadius: 20,
        backgroundColor: " rgb(241, 244, 242)",
    },
    textcategrory: {
        color: "gray",
        fontWeight: "500",
    },
});