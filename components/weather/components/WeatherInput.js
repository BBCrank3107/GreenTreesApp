import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const WeatherInput = ({ input, setInput, fetchDataHandler }) => {
    return (
        <TextInput
            placeholder='Nhập tên tỉnh thành'
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={"#000"}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomWidth: 3,
        padding: 5,
        paddingVertical: 20,
        marginVertical: 60,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 19,
        borderRadius: 16,
        borderBottomColor: '#df8e00',
    },
});

export default WeatherInput;
