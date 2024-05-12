import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const HeartBtn = () => {
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
            }}>
            <Image style={{ height: 16, width: 16 }} source={require('../images/icons/heart.png')} />
        </TouchableOpacity>
    );
}

export default HeartBtn;
