import React from "react";
import {
    StyleSheet,

    ScrollView,
} from "react-native";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Product from "./components/Product";

export default function Shop() {
    return (
        <ScrollView style={styles.container}>
            <Header />

            <Categories />

            <Product />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
