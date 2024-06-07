import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { globalColors } from '../../styles/Colors';
import { useFocusEffect } from "@react-navigation/native";
import { ipAddress } from '../../ip/ip';

const Badge = ({ number }: any) => {
    if (number === 0) return null;
    return (
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{number}</Text>
        </View>
    );
};

const CHOLAYHANG = "Đang xử lý";
const CHOGIAOHANG = "Đã gửi hàng";
const DAGIAOHANG = "Đã nhận hàng";


const Account = ({ navigation, route }: any) => {
    const userID = route.params?.userID || '';
    const [counts, setCounts] = useState({ count1: 0, count2: 0, count3: 0 });
    const [userEmail, setUserEmail] = useState('');

    const fetchCounts = async () => {
        try {
            const response = await fetch(`${ipAddress}/api/orders/count/${userID}`);
            const data = await response.json();
            setCounts(data);
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCounts();
        }, [userID])
    );

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${ipAddress}/userInfor/${userID}`);
            const data = await response.json();
            if (data.success) {
                setUserEmail(data.data.UserEmail);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        if (userID) {
            fetchUserInfo();
        }
    }, [userID]);

    const handleToOrder = (key) => {
        navigation.navigate("Order", { key, userID });
    };

    const menuItems = [
        {
            title: "Tính năng",
            subItems: ["Máy tính"],
        },
        {
            title: "Tài khoản và bảo mật",
            subItems: ["Thông tin tài khoản", "Đổi mật khẩu"],
        },
        {
            title: "Liên hệ",
            subItems: ["Hỗ trợ"],
        },
        {
            title: "Khác",
            subItems: ["Fanpage"],
        },
    ];

    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const handleItemPress = (index: number) => {
        const isExpanded = expandedItems.includes(index);
        if (isExpanded) {
            setExpandedItems(expandedItems.filter(item => item !== index));
        } else {
            setExpandedItems([...expandedItems, index]);
        }
    };

    const handleSubItemPress = (subItem: string) => {
        if (subItem === 'Đổi mật khẩu') {
            navigation.navigate('ChangePass', { userID });
        } else if (subItem === 'Máy tính') {
            navigation.navigate('Calculator', { userID });
        } else if (subItem === 'Hỗ trợ') {
            navigation.navigate('Support', { userID });
        } else if (subItem === 'Thông tin tài khoản') {
            navigation.navigate('InfoAccount', { userID });
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    {/* Avatar Icon */}
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/129-512.png' }}
                            style={{ width: 60, height: 60 }}
                        ></Image>
                    </View>
                    {/* User Name */}
                    <Text style={styles.userEmail}>{userEmail}</Text>
                </View>
                <View style={styles.cart}>
                    <TouchableOpacity
                        style={styles.btnCart}
                        onPress={() => {
                            navigation.navigate('ShopCart', { userID })
                        }}
                    >
                        <Image
                            source={require("../../components/shop/images/cart.png")}
                            style={styles.imgCart}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.scrollView}>
                <View>
                    <View style={styles.place}></View>

                    <View style={styles.oderBuy}>
                        <View style={styles.oder}>
                            <Text style={styles.textOrder}> Đơn mua</Text>
                        </View>
                        <View style={styles.purcharOrder}>
                            <TouchableOpacity
                                key={"CHOLAYHANG"}
                                style={styles.iconWrapper}
                                onPress={() => handleToOrder(CHOLAYHANG)}
                            >
                                <Image
                                    style={styles.imgOrder}
                                    source={require("./images/icons/oder1.png")}
                                ></Image>
                                <Text style={styles.texOrder}>Chờ lấy hàng</Text>
                                <Badge number={counts.count1} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconWrapper}
                                onPress={() => handleToOrder(CHOGIAOHANG)}
                            >
                                <Image
                                    style={styles.imgOrder}
                                    source={require("./images/icons/oder2.png")}
                                ></Image>
                                <Text style={styles.texOrder}>Chờ giao hàng</Text>
                                <Badge number={counts.count2} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleToOrder(DAGIAOHANG)}
                                style={styles.iconWrapper}
                            >
                                <Image
                                    style={styles.imgOrder}
                                    source={require("./images/icons/oder3.png")}
                                ></Image>
                                <Text key={"DAGIAOHANG"} style={styles.texOrder}>
                                    Đã giao hàng
                                </Text>
                                <Badge number={counts.count3} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.place}></View>
                </View>
                {menuItems.map((item, index) => (
                    <View key={index}>
                        {/* Main Item */}
                        <TouchableOpacity
                            style={[
                                styles.menuItem,
                                expandedItems.includes(index) && styles.activeItem,
                            ]}
                            onPress={() => handleItemPress(index)}
                        >
                            <Text style={styles.menuItemText}>{item.title}</Text>
                        </TouchableOpacity>

                        {/* Sub Items */}
                        {expandedItems.includes(index) &&
                            item.subItems.map((subItem, subIndex) => (
                                <TouchableOpacity
                                    key={subIndex}
                                    style={styles.subItem}
                                    onPress={() => handleSubItemPress(subItem)}
                                >
                                    <Text style={styles.subItemText}>{subItem}</Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                ))}

                {/* Logout Button */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 160 }}>
                    <TouchableOpacity style={styles.logoutButton}
                        onPress={() => {
                            navigation.navigate('Login')
                        }}>
                        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: globalColors.mainGreen,
        padding: 20,
        height: "20%",
        justifyContent: "center",
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flexDirection: 'row'
    },
    cart: {
        width: "5%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 15,
        top: -50,
        right: -20
    },
    btnCart: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden'
    },
    imgCart: {
        width: 24,
        height: 24,
        tintColor: 'white'
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 10
    },
    userEmail: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white'
    },
    scrollView: {
        flex: 1,
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    menuItemText: {
        fontSize: 18,
        color: "#333",
    },
    activeItem: {
        backgroundColor: "#e0f2e0",
    },
    subItem: {
        paddingLeft: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    subItemText: {
        fontSize: 16,
        color: "#666",
    },
    logoutButton: {
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: globalColors.mainGreen,
        marginBottom: 30,
        elevation: 5
    },
    logoutButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    oderBuy: {
        width: "100%",
        height: 140,
        paddingLeft: 12,
    },
    oder: {
        width: "100%",
        height: 40,
    },
    textOrder: {
        fontSize: 18,
        marginTop: 15,
        fontWeight: "500",
    },
    purcharOrder: {
        width: "100%",
        height: 80,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    imgOrder: {
        width: 40,
        height: 40,
        marginTop: 20,
        marginLeft: 24,
    },
    texOrder: {
        marginTop: 6,
        fontSize: 12,
        marginRight: 10,
    },
    place: {
        width: "100%",
        height: 5,
        backgroundColor: "#dfdbdb",
    },
    iconWrapper: {
        position: "relative", // Needed for positioning the badge
        marginRight: 20, // Add some margin between icons
    },
    badge: {
        position: "absolute",
        width: 25,
        height: 25,
        top: 10,
        right: 9,
        backgroundColor: "red",
        borderRadius: 30,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        // display: "none",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
});
