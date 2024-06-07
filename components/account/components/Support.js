import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Text,
    Alert
} from "react-native";
import BackBtn from "../../backBtn";
import { globalColors } from "../../../styles/Colors";
import { ipAddress } from "../../../ip/ip";

const Support = ({ navigation, route }) => {
    const userID = route.params?.userID || '';
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    useEffect(() => {
        if (userID) {
            fetch(`${ipAddress}/userInfor/${userID}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const { UserName, UserEmail, Number } = data.data;
                        setName(UserName || "");
                        setEmail(UserEmail || "");
                        setPhone(Number || "");
                    } else {
                        console.log("Failed to fetch user data:", data.message);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userID]);

    const handleSubmit = () => {
        setNameError("");
        setEmailError("");
        setPhoneError("");
        setDescriptionError("");
        let valid = true;
        if (!name.trim()) {
            setNameError("Vui lòng nhập tên của bạn");
            valid = false;
        }
        if (!email.trim()) {
            setEmailError("Vui lòng nhập email của bạn");
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email không hợp lệ");
            valid = false;
        }
        if (!phone.trim()) {
            setPhoneError("Vui lòng nhập số điện thoại của bạn");
            valid = false;
        }
        if (!description.trim()) {
            setDescriptionError("Vui lòng nhập mô tả");
            valid = false;
        }
        if (valid) {
            fetch(`${ipAddress}/support`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName: name,
                    UserNumber: phone,
                    UserEmail: email,
                    Content: description,
                    UserID: userID,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Alert.alert('Thành công', 'Đã gửi yêu cầu liên hệ thành công');
                        navigation.navigate('Account', { userID });
                    } else {
                        console.log("Failed to submit support request", data.message);
                    }
                })
                .catch(error => {
                    console.error("Error submitting support request", error);
                });
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <BackBtn onPress={() => navigation.goBack()} userID={userID} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>
                    Gửi yêu cầu hỗ trợ. Chúng tôi sẽ liên hệ lại với bạn
                </Text>
                <View style={{ alignItems: "center" }} />
                <View style={{ marginVertical: 20 }}>
                    <Text style={styles.note}>Họ và tên</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập họ và tên của bạn"
                        value={name}
                        onChangeText={setName}
                    />
                    {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
                    <Text style={styles.note}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                    <Text style={styles.note}>Số điện thoại</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập số điện thoại của bạn"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

                    <Text style={styles.note}>Nội dung</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        placeholder="Nhập nội dung chi tiết"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    {descriptionError ? (
                        <Text style={styles.error}>{descriptionError}</Text>
                    ) : null}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Gửi yêu cầu</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(240, 246, 244)",
    },
    scrollView: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        marginBottom: 20,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        justifyContent: "center",
        color: "#4D8D6E",
    },
    note: {
        marginBottom: 10,
        fontSize: 18,
        color: "black",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: globalColors.mainGreen,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: globalColors.mainGreen,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: "center",
        elevation: 5
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
});

export default Support;
