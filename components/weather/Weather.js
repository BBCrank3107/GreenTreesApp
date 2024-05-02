import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ImageBackground, ActivityIndicator } from 'react-native';
import WeatherInput from './components/WeatherInput';
import WeatherInfo from './components/WeatherInfo';

const Weather = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const weatherTranslations = {
        "Clear": "Trời quang đãng",
        "Clouds": "Trời có mây",
        "Drizzle": "Mưa phùn",
        "Rain": "Mưa",
        "Thunderstorm": "Dông",
        "Snow": "Tuyết",
        "Mist": "Sương mù",
        "Smoke": "Khói",
        "Haze": "Sương mù",
        "Dust": "Bụi",
        "Fog": "Sương mù",
        "Sand": "Cát",
        "Ash": "Tro",
        "Squall": "Bão giông",
        "Tornado": "Lốc xoáy"
    };

    const cityTranslations = {
        "Turan": "TP. Đà Nẵng",
        "Ho Chi Minh City": "TP. Hồ Chí Minh",
        "Haiphong": "Hải Phòng",
        "Hanoi": "Thủ đô Hà Nội",
        "Dalat": "Đà Lạt"
    };

    const api = {
        key: 'e53fb7bbe0678e4c71109589050d01c4',
        baseUrl: 'http://api.openweathermap.org/data/2.5/',
    }

    const fetchDataHandler = useCallback(() => {
        setLoading(true);
        setInput('');

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [api.key, input]);

    return (
        <View style={styles.root}>
            <ImageBackground source={require('./images/images/bg1.jpg')} resizeMode='cover' style={styles.image}>
                <WeatherInput input={input} setInput={setInput} fetchDataHandler={fetchDataHandler} />
                {loading && <ActivityIndicator size={"large"} color='#000' />}
                {data && <WeatherInfo data={data} cityTranslations={cityTranslations} weatherTranslations={weatherTranslations} />}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    image: {
        flex: 1,
        flexDirection: 'column'
    },
});

export default Weather;