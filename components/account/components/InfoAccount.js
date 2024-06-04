import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import { format, parseISO } from 'date-fns';
import BackBtn from "../../backBtn";
import { globalColors } from "../../../styles/Colors";
import { ipAddress } from "../../../ip/ip";

const InfoAccount = ({ navigation, route }) => {
    const userID = route.params?.userID || '';
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState({});
    const [editValues, setEditValues] = useState({});
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    useEffect(() => {
        // Fetch user information from server
        fetch(`${ipAddress}/user/${userID}`)
            .then(response => response.json())
            .then(data => setUserInfo(data))
            .catch(error => console.error('Error fetching user info:', error));
    }, [userID]);

    const handleBackPress = () => {
        navigation.navigate('Account', { userID });
    };

    const handleEditPress = (field) => {
        setIsEditing(prevState => ({ ...prevState, [field]: true }));
        setEditValues(prevState => ({ ...prevState, [field]: userInfo[field] }));
    };

    const handleCancelPress = (field) => {
        setIsEditing(prevState => ({ ...prevState, [field]: false }));
    };

    const handleSavePress = (field, value) => {
        const updatedInfo = { [field]: value };

        setUserInfo(prevState => ({ ...prevState, ...updatedInfo }));
        setIsEditing(prevState => ({ ...prevState, [field]: false }));

        // Save to server here
        fetch(`${ipAddress}/user/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error saving user info:', error);
            });
    };

    const renderUserInfo = (label, field, value, isBirthday) => {
        let displayValue = value;

        if (isBirthday && value === '0000-00-00') {
            displayValue = null;
        } else if (isBirthday) {
            displayValue = format(parseISO(value), 'yyyy-MM-dd');
        }

        if (isEditing[field]) {
            return (
                <View style={styles.item}>
                    <Text style={styles.text}>{label}</Text>
                    <View style={styles.areaUpdate}>
                        {field === 'Sex' ? (
                            <>
                                <TouchableOpacity onPress={() => handleSavePress(field, 'Nam')}>
                                    <Text style={styles.text}>Nam</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSavePress(field, 'Nữ')}>
                                    <Text style={styles.text}>Nữ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleCancelPress(field)}>
                                    <Image source={require('../images/icons/cancel.png')} style={styles.icon} />
                                </TouchableOpacity>
                            </>
                        ) : field === 'Birthday' ? (
                            <>
                                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                    <Text style={styles.text}>Chọn ngày</Text>
                                </TouchableOpacity>
                                <Modal isVisible={isDatePickerVisible}>
                                    <View style={styles.modalContent}>
                                        <DatePicker
                                            date={date}
                                            mode="date"
                                            onDateChange={(selectedDate) => setDate(selectedDate)}
                                        />
                                        <View style={styles.modalButtons}>
                                            <TouchableOpacity onPress={() => setDatePickerVisible(false)}>
                                                <Text style={styles.modalButton}>Thoát</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                handleSavePress(field, format(date, 'yyyy-MM-dd'));
                                                setDatePickerVisible(false);
                                            }}>
                                                <Text style={styles.modalButton}>Cập nhật</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </>
                        ) : (
                            <>
                                <TextInput
                                    style={styles.textInput}
                                    value={editValues[field]}
                                    onChangeText={(text) => setEditValues(prevState => ({ ...prevState, [field]: text }))}
                                    onSubmitEditing={(e) => handleSavePress(field, e.nativeEvent.text)}
                                />
                                {['UserName', 'Number'].includes(field) && (
                                    <>
                                        <TouchableOpacity onPress={() => handleSavePress(field, editValues[field])}>
                                            <Image source={require('../images/icons/tick.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleCancelPress(field)}>
                                            <Image source={require('../images/icons/cancel.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </>
                        )}
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.item}>
                <Text style={styles.text}>{label}</Text>
                <View style={styles.areaUpdate}>
                    {displayValue ? (
                        <Text style={styles.text}>{displayValue}</Text>
                    ) : (
                        <TouchableOpacity style={styles.update} onPress={() => handleEditPress(field)}>
                            <Text style={[styles.text, { color: 'gray' }]}>Thiết lập ngay</Text>
                            <Image source={require('../images/icons/enter.png')} style={{ width: 16, height: 16, marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={handleBackPress} />
                <View style={styles.areaAvt}>
                    <View style={styles.avt}>
                        <Image
                            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/129-512.png' }}
                            style={{ width: 70, height: 70 }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                {userInfo && (
                    <>
                        {renderUserInfo('Họ và tên', 'UserName', userInfo.UserName)}
                        {renderUserInfo('Giới tính', 'Sex', userInfo.Sex)}
                        {renderUserInfo('Ngày sinh', 'Birthday', userInfo.Birthday, true)}
                        {renderUserInfo('Số điện thoại', 'Number', userInfo.Number)}
                        {renderUserInfo('Email', 'UserEmail', userInfo.UserEmail)}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: '25%',
        width: '100%',
        backgroundColor: globalColors.mainGreen
    },
    areaAvt: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avt: {
        height: 70,
        width: 70,
        borderRadius: 35,
        overflow: 'hidden',
        elevation: 10
    },
    content: {
        width: '100%'
    },
    item: {
        width: '100%',
        height: 45,
        marginBottom: 10,
        borderWidth: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 5,
        color: 'black'
    },
    textInput: {
        fontSize: 18,
        paddingHorizontal: 5,
        color: 'black',
        borderBottomWidth: 1,
        borderColor: 'gray',
        flex: 1
    },
    areaUpdate: {
        height: '100%',
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    update: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 16,
        height: 16,
        marginHorizontal: 5
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    modalButton: {
        fontSize: 18,
        color: globalColors.mainGreen,
        padding: 10
    }
});

export default InfoAccount;
