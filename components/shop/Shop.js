import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Product from "./components/Product";
import { ipAddress } from "../../ip/ip";

const Shop = ({ route }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [productData, setProductData] = useState([]);

    const userID = route.params?.userID || '';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ipAddress}/category/plant/product`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProductData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <ScrollView style={styles.container}>
            <Header userID={userID}/>
            <Categories onCategoryChange={handleCategoryChange} />
            <Product selectedCategory={selectedCategory} productData={productData} userID={userID} />
        </ScrollView>
    );
}

export default Shop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
