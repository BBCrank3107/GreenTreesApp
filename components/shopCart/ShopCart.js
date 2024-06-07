import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    Alert
} from 'react-native';
import { globalColors } from '../../styles/Colors';
import BackBtn from '../backBtn';
import { ipAddress } from '../../ip/ip';

const windowHeight = Dimensions.get('window').height;
const containerHeight = windowHeight - 60 - 260;

const ShopCart = ({ navigation, route }) => {
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [checkedItems, setCheckedItems] = useState({});
    const [shippingFee, setShippingFee] = useState(20000);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const userID = route.params?.userID || '';

    useEffect(() => {
        fetchCartItems();
    }, [userID]);

    const fetchCartItems = () => {
        fetch(`${ipAddress}/userCart?userID=${userID}`)
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                const initialQuantities = {};
                data.forEach(item => {
                    initialQuantities[item.UserCartID] = item.Quantity;
                });
                setQuantities(initialQuantities);
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
    };

    const increaseQuantity = (itemID) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities, [itemID]: (prevQuantities[itemID] || 1) + 1 };
            return newQuantities;
        });
    };

    const decreaseQuantity = (itemID) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities, [itemID]: (prevQuantities[itemID] || 1) > 1 ? prevQuantities[itemID] - 1 : 1 };
            return newQuantities;
        });
    };

    const handleCheck = (itemID) => {
        setCheckedItems(prevCheckedItems => ({
            ...prevCheckedItems,
            [itemID]: !prevCheckedItems[itemID],
        }));
    };

    const handleQuantityChange = (itemID, newQuantity) => {
        if (newQuantity === '') {
            setQuantities(prevQuantities => {
                const newQuantities = { ...prevQuantities, [itemID]: 0 };
                return newQuantities;
            });
        } else {
            const parsedQuantity = parseInt(newQuantity, 10);
            if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
                setQuantities(prevQuantities => {
                    const newQuantities = { ...prevQuantities, [itemID]: parsedQuantity };
                    return newQuantities;
                });
            }
        }
    };

    const totalPrice = cartItems.reduce((total, item) => {
        if (checkedItems[item.UserCartID]) {
            return total + item.Price * (quantities[item.UserCartID] || 1);
        }
        return total;
    }, 0);

    const deleteCartItem = (userCartID) => {
        setDeleteItemId(userCartID);
        setShowAlert(true);
    };

    const confirmDelete = () => {
        if (deleteItemId !== null) {
            fetch(`${ipAddress}/delete-from-cart/${deleteItemId}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    fetchCartItems();
                })
                .catch(error => {
                    console.error('Error deleting cart item:', error);
                })
                .finally(() => {
                    setShowAlert(false);
                    setDeleteItemId(null);
                });
        }
    };

    const handlePurchase = () => {
        const selectedItems = cartItems.filter(item => checkedItems[item.UserCartID]).map(item => ({
            ProductName: item.ProductName,
            Quantity: quantities[item.UserCartID],
            Price: item.Price,
            Image: item.Image
        }));

        if (selectedItems.length === 0) {
            Alert.alert('Thông báo', 'Hãy chọn sản phẩm');
            return;
        }

        navigation.navigate('purchaseInfor', {
            selectedItems,
            totalPrice,
            shippingFee,
            totalPayment: totalPrice + shippingFee,
            userID
        });
    };

    const totalPayment = totalPrice + shippingFee;
    return (
        <View>
            <BackBtn onPress={() => navigation.goBack()} userID={userID} />
            <View style={styles.header}>
                <Text style={styles.title}>Giỏ hàng</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.products}>
                    {cartItems.map(item => (
                        <View key={item.UserCartID} style={styles.product}>
                            <View style={styles.areaCheck}>
                                <TouchableOpacity onPress={() => handleCheck(item.UserCartID)}>
                                    <View style={[styles.checkbox, checkedItems[item.UserCartID] && styles.checked]}>
                                        <Text style={styles.tick}>✔</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.areaImg}>
                                <Image source={{ uri: item.Image }} style={styles.img} />
                            </View>
                            <View style={styles.areaInfo}>
                                <Text style={styles.textName}>{item.ProductName}</Text>
                                <Text style={styles.textPrice}>{item.Price.toLocaleString()} VNĐ</Text>
                            </View>
                            <View style={styles.handle}>
                                <View style={styles.deleteIconContainer}>
                                    <TouchableOpacity onPress={() => deleteCartItem(item.UserCartID)}>
                                        <Image
                                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png' }}
                                            style={styles.deleteIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.areaQuantity}>
                                    <TouchableOpacity style={styles.btnUpAnDown} onPress={() => decreaseQuantity(item.UserCartID)}>
                                        <Text style={styles.textBtnUpAnDown}>-</Text>
                                    </TouchableOpacity>
                                    <View style={styles.areaTextQuantity}>
                                        <TextInput
                                            style={styles.textQuantity}
                                            keyboardType="numeric"
                                            value={String(quantities[item.UserCartID])}
                                            onChangeText={(text) => handleQuantityChange(item.UserCartID, text)}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.btnUpAnDown} onPress={() => increaseQuantity(item.UserCartID)}>
                                        <Text style={styles.textBtnUpAnDown}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <View style={styles.priceProduct}>
                    <Text style={styles.text1}>Tổng tiền hàng:</Text>
                    <Text style={styles.text2}>
                        {totalPrice.toLocaleString()} VNĐ
                    </Text>
                </View>
                <View style={styles.priceProduct}>
                    <Text style={styles.text1}>Phí vận chuyển:</Text>
                    <Text style={styles.text2}>
                        {shippingFee.toLocaleString()} VNĐ
                    </Text>
                </View>
                <View style={styles.priceProduct}>
                    <Text style={styles.text1}>Tổng thanh toán:</Text>
                    <Text style={styles.text2}>
                        {totalPayment.toLocaleString()} VNĐ
                    </Text>
                </View>
                <View style={styles.areaBtn}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handlePurchase}
                    >
                        <Text style={styles.textBtn}>Mua hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showAlert && (
                <View style={styles.alertContainer}>
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>Bạn có muốn xóa sản phẩm này?</Text>
                        <View style={styles.alertButtons}>
                            <TouchableOpacity style={styles.alertButton} onPress={() => setShowAlert(false)}>
                                <Text style={{ color: 'black', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.alertButton, styles.alertButtonConfirm]} onPress={confirmDelete}>
                                <Text style={styles.alertButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
export default ShopCart;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: containerHeight,
        paddingHorizontal: 15,
        backgroundColor: '#d9d9d9'
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
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
    bottom: {
        height: 220,
        justifyContent: 'flex-end',
        padding: 20,
        zIndex: 1
    },
    priceProduct: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15
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
        alignItems: 'center',
        top: 10
    },
    btn: {
        width: '80%',
        height: 50,
        backgroundColor: globalColors.mainGreen,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 5
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
        width: '33%',
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
        width: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        left: 5
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
        textAlign: 'center'
    },
    deleteIconContainer: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 10
    },
    deleteIcon: {
        width: 24,
        height: 24
    },
    alertContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alert: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    alertText: {
        fontSize: 18,
        marginBottom: 20,
    },
    alertButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    alertButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginLeft: 10,
        borderRadius: 5,
    },
    alertButtonConfirm: {
        backgroundColor: 'red',
    },
    alertButtonText: {
        fontSize: 16,
        color: 'white',
    },
});
