import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Image, View, Keyboard } from 'react-native';

const WeatherInput = ({ input, setInput, fetchDataHandler }) => {
    const hideKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Nhập tên tỉnh thành'
                    onChangeText={text => setInput(text)}
                    value={input}
                    placeholderTextColor="#000"
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={() => {fetchDataHandler(); hideKeyboard();}} style={styles.iconContainer}>
                    <Image source={require('../images/icons/search.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        position: 'relative',
        width: "100%",
        padding: 20,
        paddingTop: 50
    },
    textInput: {
        borderBottomWidth: 3,
        padding: 5,
        paddingVertical: 20,
        backgroundColor: '#fff',
        fontSize: 19,
        borderRadius: 16,
        borderBottomColor: '#df8e00',
        width: "100%"
    },
    iconContainer: {
        position: 'absolute',
        top: '50%',
        right: 40,
        transform: [{ translateY: 35 }], 
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default WeatherInput;
