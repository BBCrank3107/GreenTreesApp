import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherInfo = ({ data, cityTranslations, weatherTranslations }) => {
    return (
        <View style={styles.weatherInfo}>
            <Text style={styles.cityCountryText}>{cityTranslations[data.name] || data.name}, {data.sys.country}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{Math.round(data.main.temp)}°C</Text>
            <Text style={styles.minMaxText}>Thấp nhất: {Math.round(data.main.temp_min)}°C / Cao nhất: {Math.round(data.main.temp_max)}°C</Text>
            <Image
                style={styles.weatherIcon}
                source={{ uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png` }}
            />
            <Text style={styles.weatherText}>{weatherTranslations[data.weather[0].main]}</Text>
            <Text style={styles.additionalInfo}>Gió: {data.wind.speed} m/s, Độ ẩm: {data.main.humidity}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    cityCountryText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateText: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 10,
    },
    tempText: {
        fontSize: 45,
        color: '#fff',
        marginBottom: 10,
    },
    minMaxText: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 150,
        height: 100,
    },
    weatherText: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 10,
    },
    additionalInfo: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 10,
    },
});

export default WeatherInfo;
