import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
    Image
} from "react-native";
import { globalColors } from "../../styles/Colors";
const LOGIN = "LOGIN";
const SIGN_UP = "SIGN_UP";

const Login = ({ navigation }) => {
    const [page, setPage] = useState(LOGIN);
    const [pwdHidden, setPwdHidden] = useState(true);

    const renderForm = () => {
        if (page === LOGIN) {
            return (
                <View style={{ width: '100%', height: '60%' }}>
                    <View style={styles.atext}>
                        <Text style={styles.textIn}>Đăng nhập vào tài khoản</Text>
                    </View>
                    <TextInput style={styles.input1} placeholder="E-mail"></TextInput>
                    <View style={styles.pass}>
                        <TextInput
                            style={styles.input2}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={pwdHidden ? true : false}
                        ></TextInput>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setPwdHidden(!pwdHidden)}
                        >
                            <Image
                                source={!pwdHidden ? require("./images/hide.png") : require("./images/view.png")}
                                resizeMode="stretch"
                                style={styles.iconshowpass}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.areaforgot}>
                        <Text style={styles.forgot}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            navigation.navigate('HomeTabs')
                        }}
                    >
                        <Text style={styles.textBtn}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <View style={styles.solid}>
                            <View style={styles.left}></View>
                            <View>
                                <Text>hoặc</Text>
                            </View>
                            <View style={styles.right}></View>
                        </View>
                        <View style={styles.logo}>
                            <TouchableOpacity style={styles.logoLeft}>
                                <Text style={styles.logoLeftText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoRight}>
                                <Text style={styles.logoRightText}>Apple</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else if (page === SIGN_UP) {
            return (
                <View style={{ width: '100%', height: '50%' }}>
                    <View style={styles.atext}>
                        <Text style={styles.textIn}>Đăng ký tài khoản</Text>
                    </View>
                    <TextInput style={styles.input1} placeholder="E-mail"></TextInput>
                    <View style={styles.pass}>
                        <TextInput
                            style={styles.input2}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={pwdHidden ? true : false}
                        ></TextInput>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setPwdHidden(!pwdHidden)}
                        >
                            <Image
                                source={!pwdHidden ? require("./images/hide.png") : require("./images/view.png")}
                                resizeMode="stretch"
                                style={styles.iconshowpass}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pass}>
                        <TextInput
                            style={styles.input2}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={pwdHidden ? true : false}
                        ></TextInput>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setPwdHidden(!pwdHidden)}
                        >
                            <Image
                                source={!pwdHidden ? require("./images/hide.png") : require("./images/view.png")}
                                resizeMode="stretch"
                                style={styles.iconshowpass}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.textBtn}>Đăng ký ngay</Text>
                    </TouchableOpacity>

                    <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Text>
                            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản và Chính sách của chúng tôi.
                        </Text>
                    </View>
                </View>
            );
        }
    }
    return (
        <View style={styles.content}>
            <StatusBar barStyle="light-content" />
            {/* // loginheader */}
            <View style={styles.header}>
                <View style={styles.under}>
                    <Text style={styles.headText}>GreenTrees</Text>
                    <Text style={styles.headText2}>think for nature</Text>
                </View>
                <View style={styles.abort}>
                    <TouchableOpacity
                        style={styles.btn_login}
                        onPress={() => setPage(LOGIN)}
                        disabled={page === LOGIN ? true : false}
                    >
                        <Text style={styles.cl}>Đăng nhập</Text>
                        {page === LOGIN ? <View style={styles.brightbar}></View> : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn_signup}
                        onPress={() => setPage(SIGN_UP)}
                        disabled={page === SIGN_UP ? true : false}
                    >
                        <Text style={styles.cl}>Đăng ký</Text>
                        {page === SIGN_UP ? <View style={styles.brightbar}></View> : null}
                    </TouchableOpacity>
                </View>
            </View>
            {/* end loginheader */}

            {/* Body */}
            <View style={styles.body}>{renderForm()}</View>
            {/* End Body */}

        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(215, 213, 213, 0.362)",
    },
    header: {
        width: "100%",
        height: "30%",
    },
    under: {
        width: "100%",
        flex: 1,
        backgroundColor: globalColors.mainGreen,
        justifyContent: "center",
        alignItems: "center",
    },
    headText: {
        fontSize: 40,
        color: "white",
        fontWeight: "700",
    },
    headText2: {
        color: "white",
    },
    abort: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
    },
    btn_login: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    btn_signup: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    cl: {
        color: globalColors.mainGreen,
        fontSize: 20,
    },
    brightbar: {
        position: "absolute",
        bottom: 0,
        height: 3,
        width: "100%",
        backgroundColor: globalColors.mainGreen,
    },

    //  body
    atext: {
        width: "100%",
        height: "35%",
        justifyContent: "center",
    },
    textIn: {
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 30,
    },
    input1: {
        width: 330,
        height: 60,
        borderWidth: 1,
        borderColor: "rgba(219, 218, 216, 0.362)",
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontWeight: "500",
        marginLeft: 30,
        backgroundColor: "white",
        fontSize: 16
    },
    input2: {
        backgroundColor: "white",
        width: 330,
        height: 60,
        borderWidth: 1,
        borderColor: "rgba(219, 218, 216, 0.362)",
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontWeight: "500",
        marginLeft: 30,
        fontSize: 16
    },
    iconContainer: {
        position: "absolute",
        right: 45,
        top: 17,
        transform: [{ translateY: -12 }],
        marginLeft: 10,
    },
    iconshowpass: {
        width: 20,
        height: 20,
    },
    email: {
        justifyContent: "center",
    },
    pass: {
        flexDirection: "row",
    },
    iconshowpass: {
        width: 20,
        height: 20,
        marginTop: 17,
    },
    areaforgot: {
        width: "100%",
        marginBottom: 20,
    },
    forgot: {
        textAlign: "right",
        marginRight: 30,
        fontSize: 14,
        // color: "rgba(107, 106, 106, 0.362)",
        fontWeight: "500",
    },
    areabtnlogin: {
        width: "100%",
        height: 30,
    },
    btn: {
        width: 330,
        height: 60,
        backgroundColor: globalColors.mainGreen,
        marginLeft: 30,
        borderRadius: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    textBtn: {
        margin: "auto",
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
    // endbody

    footer: {
        height: "70%",
        marginTop: 20
    },
    solid: {
        height: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    left: {
        height: 1,
        width: "36%",
        backgroundColor: "#707070",
        marginRight: 5,
    },
    right: {
        height: 1,
        width: "36%",
        backgroundColor: "#707070",
        marginLeft: 5,
    },
    logo: {
        height: "60%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    logoLeft: {
        width: 120,
        height: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 10,
    },
    logoRight: {
        width: 120,
        height: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    logoLeftText: {
        fontWeight: "600",
    },
    logoRightText: {
        fontWeight: "600",
    },
});
