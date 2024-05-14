import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    PanResponder,
    TextInput
} from 'react-native';
import { globalColors } from '../../styles/Colors';
import BackBtn from '../backBtn';

const ShopCart = ({ navigation, route }) => {
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [quantity, setQuantity] = useState(1); // State để lưu số lượng

    // Hàm xử lý tăng số lượng
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Hàm xử lý giảm số lượng
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const userID = route.params?.userID || '';

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const { dx } = gestureState;
            if (dx < -50) {
                setShowDeleteIcon(true);
            } else {
                setShowDeleteIcon(false);
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            setShowDeleteIcon(false);
        }
    });

    return (
        <View>
            <BackBtn onPress={() => navigation.navigate('HomeTabs', { screen: 'Shop', params: { userID } })} userID={userID} />
            <View style={styles.header}>
                <Text style={styles.title}>Giỏ hàng</Text>
                <Text>UserID: {userID}</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.products}>
                    <TouchableOpacity {...panResponder.panHandlers} style={styles.product}>
                        <View style={styles.areaImg}>
                            <Image source={require('../shop/images/test.jpg')} style={styles.img} />
                        </View>
                        <View style={styles.areaInfo}>
                            <Text style={styles.textName}>Cây cà phê</Text>
                            <Text style={styles.textPrice}>20.000 VNĐ</Text>
                        </View>
                        <View style={styles.handle}>
                            <View style={styles.areaCheck}>
                                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                                    <View style={[styles.checkbox, isChecked && styles.checked]}>
                                        <Text style={styles.tick}>✔</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.areaQuantity}>
                                {/* Button giảm số lượng */}
                                <TouchableOpacity style={styles.btnUpAnDown} onPress={decreaseQuantity}>
                                    <Text style={styles.textBtnUpAnDown}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.areaTextQuantity}>
                                    {/* Hiển thị số lượng */}
                                    <TextInput style={styles.textQuantity}>{quantity}</TextInput>
                                </View>
                                {/* Button tăng số lượng */}
                                <TouchableOpacity style={styles.btnUpAnDown} onPress={increaseQuantity}>
                                    <Text style={styles.textBtnUpAnDown}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {showDeleteIcon && (
                            <TouchableOpacity style={styles.deleteIconContainer}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png' }}
                                    style={styles.deleteIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity {...panResponder.panHandlers} style={styles.product}>
                        <View style={styles.areaImg}>
                            <Image source={require('../shop/images/test.jpg')} style={styles.img} />
                        </View>
                        <View style={styles.areaInfo}>
                            <Text style={styles.textName}>Cây cà phê</Text>
                            <Text style={styles.textPrice}>20.000 VNĐ</Text>
                        </View>
                        <View style={styles.handle}>
                            <View style={styles.areaCheck}>
                                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                                    <View style={[styles.checkbox, isChecked && styles.checked]}>
                                        <Text style={styles.tick}>✔</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.areaQuantity}>
                                {/* Button giảm số lượng */}
                                <TouchableOpacity style={styles.btnUpAnDown} onPress={decreaseQuantity}>
                                    <Text style={styles.textBtnUpAnDown}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.areaTextQuantity}>
                                    {/* Hiển thị số lượng */}
                                    <TextInput style={styles.textQuantity}>{quantity}</TextInput>
                                </View>
                                {/* Button tăng số lượng */}
                                <TouchableOpacity style={styles.btnUpAnDown} onPress={increaseQuantity}>
                                    <Text style={styles.textBtnUpAnDown}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {showDeleteIcon && (
                            <TouchableOpacity style={styles.deleteIconContainer}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png' }}
                                    style={styles.deleteIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={{ padding: 20, zIndex: 1 }}>
                <View style={styles.price}>
                    <Text style={styles.text1}>Tổng tiền:</Text>
                    <Text style={styles.text2}>200.000 VNĐ</Text>
                </View>
                <View style={styles.areaBtn}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.textBtn}>Mua hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ShopCart;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 500,
        paddingHorizontal: 20,
        backgroundColor: '#d9d9d9'
    },
    header: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: '500',
        color: globalColors.mainGreen
    },
    products: {
        width: '100%',
        overflow: 'hidden',
        marginTop: 10
    },
    product: {
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 1,
        marginBottom: 20,
        flexDirection: 'row'
    },
    price: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20
    },
    text1: {
        fontSize: 20,
        color: 'black',
        paddingRight: 10
    },
    text2: {
        fontSize: 20,
        color: globalColors.mainGreen
    },
    areaBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: '80%',
        height: 50,
        backgroundColor: globalColors.mainGreen,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    textBtn: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    areaImg: {
        width: '30%',
        height: '100%',
        overflow: 'hidden',
        padding: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    areaInfo: {
        width: '40%',
        height: '100%',
        overflow: 'hidden',
        justifyContent: 'center'
    },
    textName: {
        fontSize: 20,
        color: 'black'
    },
    textPrice: {
        fontSize: 18,
        color: globalColors.mainGreen
    },
    handle: {
        width: '30%',
        height: '100%',
    },
    areaCheck: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 10,
        paddingRight: 5
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: globalColors.mainGreen,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checked: {
        backgroundColor: globalColors.mainGreen,
    },
    tick: {
        fontSize: 16,
        color: 'white'
    },
    areaQuantity: {
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    btnUpAnDown: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColors.mainGreen,
        borderRadius: 12
    },
    textBtnUpAnDown: {
        fontSize: 24,
        paddingBottom: 3,
        color: 'white',
        position: 'absolute'
    },
    areaTextQuantity: {
        width: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textQuantity: {
        fontSize: 20,
        height: 50,
    },
    deleteIcon: {
        width: 30,
        height: 30
    }
});