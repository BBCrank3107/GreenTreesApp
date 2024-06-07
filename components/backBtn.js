import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackBtn = ({ onPress, userID }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress && typeof onPress === 'function') {
            onPress();
        } else {
            navigation.navigate('HomeTabs', { screen: 'Shop', params: { userID } });
        }
    };

    return (
        <TouchableOpacity
            style={{
                height: 36,
                width: 36,
                backgroundColor: '#f7f7f7', 
                justifyContent: 'center', 
                alignItems: 'center', 
                borderRadius: 23, 
                margin: 10, 
                elevation: 1
            }}
            onPress={handlePress}>
            <Image style={{ height: 16, width: 16 }} source={require('../images/icons/back.png')} />
        </TouchableOpacity>
    );
}

export default BackBtn;
