import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Product from "./components/Product";
import { SearchProvider } from "./components/SearchContext";
import { ipAddress } from "../../ip/ip";

const Shop = ({ route }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [productData, setProductData] = useState([]);

    const userID = route.params?.userID || "";

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ipAddress}/category/plant/product`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProductData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCategoriesData();
    }, []);
    const fetchCategoriesData = async () => {
        try {
            const response = await fetch(`${ipAddress}/category`);
            if (!response.ok) {
                throw new Error("Không lấy được dat file cate");
            }
            const data = await response.json();
            setCategoriesData(data);
        } catch (error) {
            console.error("Error fetching categories data:", error);
        }
    };

    return (
        <SearchProvider>
            <ScrollView style={styles.container}>
                <Header userID={userID} />
                <Categories
                    onCategoryChange={handleCategoryChange}
                    categoriesData={categoriesData}
                    selectedCategory={selectedCategory}
                />
                <Product
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    productData={productData}
                    userID={userID}
                />
            </ScrollView>
        </SearchProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default Shop;
