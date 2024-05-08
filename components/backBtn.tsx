import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const BackBtn = ({ onPress }: any) => {
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
            onPress={onPress}>
            <Image style={{ height: 16, width: 16 }} source={require('../images/icons/back.png')} />
        </TouchableOpacity>
    );
}

export default BackBtn;
