import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { globalColors } from '../../styles/Colors';

const Account = ({ navigation, route }: any) => {
    const userEmail = route.params?.userEmail || '';
    const userID = route.params?.userID || '';
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
        <View style={styles.container}>
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

                {/* Logout Button */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={styles.logoutButton}
                        onPress={() => {
                            navigation.navigate('Login')
                        }}>
                        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
});
