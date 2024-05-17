import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import BackBtn from "../../backBtn";
import { globalColors } from "../../../styles/Colors";
import { ipAddress } from "../../../ip/ip";

const ChangePass = ({ navigation, route }) => {
  const userID = route.params?.userID || '';

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pwdHidden, setPwdHidden] = useState(true);

  const togglePwdVisibility = () => {
    setPwdHidden(!pwdHidden);
  };

  const handleBackPress = () => {
    navigation.navigate('Account', { userID });
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và nhập lại mật khẩu mới không khớp.");
      return;
    }

    try {
      const response = await fetch(`${ipAddress}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert("Thành công", "Cập nhật mật khẩu thành công.");
        navigation.navigate('Account', { userID });
      } else {
        Alert.alert("Lỗi", result.message);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật mật khẩu.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <BackBtn onPress={handleBackPress}></BackBtn>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>
          Cập nhật mật khẩu
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.note}>Mật khẩu phải gồm chữ và số</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.note}>Mật khẩu hiện tại</Text>
            <TouchableOpacity onPress={togglePwdVisibility}>
              <Text style={{ fontSize: 18 }}>{pwdHidden ? 'HIỆN' : 'ẨN'}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu hiện tại"
              secureTextEntry={pwdHidden}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>
          <Text style={styles.note}>Mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={pwdHidden}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry={pwdHidden}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Cập nhật</Text>
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
    color: 'black'
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: globalColors.mainGreen,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16
  },
  button: {
    backgroundColor: globalColors.mainGreen,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePass;
