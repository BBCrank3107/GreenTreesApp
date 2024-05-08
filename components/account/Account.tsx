import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { globalColors } from '../../styles/Colors';

const Account = ({ navigation }: any) => {
    const menuItems = [
        {
            title: "Tính năng",
            subItems: ["Máy tính", "Giá cả thị trường"],
        },
        {
            title: "Tài khoản và bảo mật",
            subItems: ["Thông tin tài khoản", "Đổi mật khẩu"],
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

    const handleCloseSubItems = () => {
        setExpandedItems([]);
    };

    const handleSubItemPress = (subItem: string) => {
        if (subItem === 'Đổi mật khẩu') {
            navigation.navigate('ChangePass');
        } else if (subItem === 'Thông tin tài khoản') {
            navigation.navigate('InfoAccount');
        } else if (subItem === 'Máy tính') {
            navigation.navigate('Calculator');
        } else if (subItem === 'Giá cả thị trường') {
            navigation.navigate('Price');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    {/* Avatar Icon */}
                    <View style={styles.avatar}></View>
                    {/* User Name */}
                    <Text style={styles.userName}>Văn Bình Nguyễn</Text>
                </View>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.scrollView}>
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
            </ScrollView>

            {/* Logout Button */}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 80 }}>
                <TouchableOpacity style={styles.logoutButton}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}>
                    <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        marginRight: 10,
    },
    userName: {
        // marginTop: 20,
        fontSize: 25,
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
        // fontWeight: 'bold'
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
    },
    logoutButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Account;
