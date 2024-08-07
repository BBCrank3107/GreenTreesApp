import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ipAddress } from "../../ip/ip";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import BackBtn from "../backBtn";
import { globalColors } from "../../styles/Colors";

const CHOLAYHANG = "Đang xử lý";
const CHOGIAOHANG = "Đã gửi hàng";
const DAGIAOHANG = "Đã nhận hàng";

const InforOrder = ({ navigation }) => {
  const route = useRoute();
  const OrderCode = route.params.OrderCode;
  const userID = route.params.userID;
  const key = route.params.key;
  const [orderPro, setOrderPro] = useState([]);
  const [totalPayment, setTotalPayment] = useState(null);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN');
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${ipAddress}/api/product/${OrderCode}`);
        const data = await response.json();
        setOrderPro(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTotalPayment = async () => {
      try {
        const response = await fetch(
          `${ipAddress}/api/orders/total/${OrderCode}`
        );
        const data = await response.json();
        setTotalPayment(data.totalPayment);
      } catch (error) {
        console.error("Error fetching total payment:", error);
      }
    };

    fetchOrder();
    fetchTotalPayment();
  }, [OrderCode]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Hàm handleBackPress
  const handleBackPress = () => {
    navigation.goBack()
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackBtn onPress={handleBackPress} />
        <Text style={styles.headerText}>Thông tin đơn hàng</Text>
      </View>
      <View style={styles.inforAddress}>
        <View style={styles.areaIcon}>
          <Image
            source={require("./images/icons/address.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.address}>
          <Text style={styles.textBold}>Địa chỉ nhận hàng</Text>
          <Text style={styles.text}>
            {orderPro.length > 0 ? orderPro[0].UserName : ""}
          </Text>
          <Text style={styles.text}>
            {orderPro.length > 0 ? orderPro[0].UserNumber : ""}
          </Text>
          <Text style={styles.text}>
            {orderPro.length > 0 ? orderPro[0].UserAddress : ""}
          </Text>
        </View>
      </View>

      <View style={styles.productWait}>
        {orderPro.length > 0 &&
          orderPro.map((product, index) => (
            <View key={index} style={styles.productInfo}>
              <View style={styles.areaImage}>
                <Image
                  style={styles.imageProduct}
                  source={{ uri: product.Image }}
                />
              </View>
              <View style={styles.areaName}>
                <Text style={styles.textProduct}>{product.ProductName}</Text>
                <Text style={styles.text}>x{product.Quantity}</Text>
                <Text style={styles.textPrice}> {formatCurrency(product.Price)} VNĐ </Text>
              </View>
            </View>
          ))}
        <View style={styles.payment}>
          <Text style={styles.textBold}>
            Thành tiền: {totalPayment !== null ? formatCurrency(totalPayment) + " VNĐ" : "Đang tải..."}
          </Text>
          <Text style={styles.textBold}>Phí vận chuyển: 20.000 VNĐ</Text>
          <Text style={styles.textBold}>
            Tổng thanh toán: {totalPayment !== null ? formatCurrency(totalPayment + 20000) + " VNĐ" : "Đang tải..."}
          </Text>
        </View>

        <View style={styles.method}>
          <View style={styles.areaIcon}>
            <Image
              source={require("./images/icons/payment.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.address}>
            <Text style={styles.textBold}>Phương thức thanh toán</Text>
            <Text style={styles.text}>Thanh toán khi nhận hàng</Text>

            <Text style={styles.text}>
              {orderPro.length > 0 ? orderPro[0].PaymentMethod : ""}
            </Text>
          </View>
        </View>

        <View style={styles.inforOrder}>
          <View style={styles.label}>
            <Text style={styles.textBold}>Mã đơn hàng</Text>
            <Text style={styles.text}>Thời gian đặt hàng</Text>
          </View>
          <View style={styles.infor}>
            <Text style={styles.textBold}>
              {orderPro.length > 0 ? orderPro[0].OrderCode : ""}
            </Text>
            <Text style={styles.text}>
              {orderPro.length > 0 ? formatDate(orderPro[0].DateOrder) : ""}{" "}
              {orderPro.length > 0 ? orderPro[0].TimeOrder : ""}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InforOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
    flexDirection: 'row'
  },
  headerText: {
    width: '75%',
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: 'center'
  },
  inforAddress: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  areaIcon: {
    alignItems: "center",
    paddingRight: 5
  },
  icon: {
    width: 24,
    height: 24,
  },
  address: {
    flex: 1,
  },
  textBold: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  textSmall: {
    fontSize: 14,
    color: "gray",
  },
  text: {
    fontSize: 16,
    color: "#666",
    marginVertical: 2,
  },
  productWait: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  productInfo: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  areaImage: {
    marginRight: 10,
  },
  imageProduct: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  areaName: {
    flex: 1,
    justifyContent: "center",
  },
  textProduct: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
    fontWeight: '500'
  },
  textPrice: {
    fontSize: 18,
    color: "#4CAF50",
  },
  payment: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "flex-end",
  },
  method: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  inforOrder: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  label: {
    flex: 1,
  },
  infor: {
    flex: 1,
    alignItems: "flex-end",
  },
  areaBtn: {
    padding: 20,
    alignItems: "center",
  },
  btn: {
    width: "80%",
    padding: 15,
    backgroundColor: globalColors.mainGreen,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
