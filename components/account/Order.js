import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
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
import { ipAddress } from "../../ip/ip";
import { globalColors } from "../../styles/Colors";

const CHOLAYHANG = "Đang xử lý";
const CHOGIAOHANG = "Đã gửi hàng";
const DAGIAOHANG = "Đã nhận hàng";

const Order = ({ navigation }) => {
  const route = useRoute();
  const key = route.params?.key;
  const userID = route.params?.userID;
  const [page, setPage] = useState(key);
  const [orders, setOrders] = useState([]);
  const [totalPayments, setTotalPayments] = useState({});

  const handleBackPress = () => {
    navigation.navigate("HomeTabs", { screen: "Account", params: { userID } });
  };

  const handleInforOrder = (OrderCode) => {
    console.log("Clicked on OrderCode:", OrderCode);
    navigation.navigate("InforOrder", { OrderCode });
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${ipAddress}/api/sellers/${userID}/${page}`
      );
      const data = await response.json();
      const uniqueOrders = new Map();
      data.forEach((order) => {
        if (!uniqueOrders.has(order.OrderCode)) {
          uniqueOrders.set(order.OrderCode, order);
        }
      });
      const filteredData = Array.from(uniqueOrders.values());
      setOrders(filteredData);

      // Fetch total payments
      const payments = {};
      for (const order of filteredData) {
        payments[order.OrderCode] = await fetchTotalPayment(order.OrderCode);
      }
      setTotalPayments(payments);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchTotalPayment = async (orderCode) => {
    try {
      const response = await fetch(
        `${ipAddress}/api/orders/total/${orderCode}`
      );
      const data = await response.json();
      return data.totalPayment;
    } catch (error) {
      console.error("Error fetching total payment:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [userID, page]);

  const handleDelete = async (OrderCode) => {
    try {
      const response = await fetch(
        `${ipAddress}/api/delete-seller/${OrderCode}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Order deleted successfully");
        // Làm mới danh sách đơn hàng sau khi xóa thành công
        fetchOrder();
      } else {
        console.log("Failed to delete order");
      }
    } catch (err) {
      console.log("ERR", err);
    }
  };

  const confirmDelete = (OrderCode) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn hủy đơn hàng này?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete(OrderCode) },
      ],
      { cancelable: false }
    );
  };

  const handleDelivered = async (orderCode) => {
    try {
      const response = await fetch(
        `${ipAddress}/api/orders/update-status/${orderCode}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        // Cập nhật trạng thái mới
        const updatedOrders = orders.map((order) => {
          if (order.OrderCode === orderCode) {
            return { ...order, Status: DAGIAOHANG };
          }
          return order;
        });
        setOrders(updatedOrders);
        navigation.replace("Order", { key: DAGIAOHANG, userID });
      } else {
        console.error("Error marking order as delivered:", response.statusText);
      }
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  const renderBtn = (status, OrderCode) => {
    if (status === CHOLAYHANG) {
      return (
        <TouchableOpacity
          onPress={() => confirmDelete(OrderCode)}
          style={styles.btnContactWait}
        >
          <Text style={styles.textBtnContact}>Hủy đơn hàng</Text>
        </TouchableOpacity>
      );
    } else if (status === CHOGIAOHANG) {
      return (
        <TouchableOpacity
          onPress={() => handleDelivered(OrderCode)}
          style={styles.btnContactDelevery}
        >
          <Text style={styles.textBtnContact}>Đã nhận hàng</Text>
        </TouchableOpacity>
      );
    } else if (status === DAGIAOHANG) {
      return (
        <TouchableOpacity style={styles.btnContactDelevery}>
          <Text style={styles.textBtnContact}>Đánh giá</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const getOrderMessage = () => {
    if (page === CHOLAYHANG) {
      return "Chúng tôi đang chuẩn bị hàng và sẽ bàn giao sớm cho đơn vị vận chuyển.";
    } else if (page === CHOGIAOHANG) {
      return "Đơn hàng đang được giao đến chỗ bạn. Bạn đã nhận hàng chưa ?";
    } else if (page === DAGIAOHANG) {
      return "Cảm ơn bạn đã mua hàng của chúng tôi.";
    }
    return "";
  };

  const renderForm = () => {
    if (orders.length === 0) {
      return (
        <View style={styles.fullNoOrder}>
          <View style={styles.areaNoOrder}>
            <Image
              style={styles.ImgNoOrder}
              source={require("./images/icons/order-now.png")}
            />
            <Text style={styles.textNoOrder}>Chưa có đơn đặt hàng</Text>
          </View>
        </View>
      );
    }

    const formatCurrency = (amount) => {
      return amount.toLocaleString('vi-VN');
    };

    return (
      <ScrollView>
        {orders.map((order, index) => (
          <TouchableOpacity
            onPress={() => {
              handleInforOrder(order.OrderCode);
            }}
            key={index}
            style={styles.productWait}
          >
            <View style={styles.graySpace}></View>
            <View style={styles.productInfo}>
              <View style={styles.areaImage}>
                <Image
                  style={styles.imageProduct}
                  source={{ uri: order.Image }}
                />
              </View>
              <View style={styles.areaName}>
                <Text style={styles.textProduct}>{order.ProductName}</Text>
                <Text style={styles.textAmount}> x{order.Quantity} </Text>
                <Text style={styles.textPrice}> {formatCurrency(order.Price)} VNĐ </Text>
              </View>
            </View>
            <View style={styles.payment}>
              <Text style={styles.textPayment}>
                Thành tiền:{" "}
                <Text style={styles.totalPrice}>
                  {formatCurrency(totalPayments[order.OrderCode] + 20000) || 'Đang tải...'} VNĐ
                </Text>
              </Text>
            </View>
            <View style={styles.contact}>
              <View style={styles.textCon}>
                <Text style={styles.mess}>
                  {getOrderMessage()}
                </Text>
              </View>
              <View style={styles.areaBtn}>
                {renderBtn(order.Status, order.OrderCode)}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.odernav}>
        <View style={styles.backOrder}>
          <BackBtn onPress={handleBackPress}></BackBtn>
          <Text style={styles.textOrder}>Đơn mua </Text>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Support', { userID }) }}>
            <Image
              style={styles.imageChat}
              source={require("./images/icons/bubble-chat.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.oderState}>
          <TouchableOpacity
            style={styles.state}
            onPress={() => setPage(CHOLAYHANG)}
          >
            <Text
              style={[
                styles.textState,
                page === CHOLAYHANG && styles.textActive,
              ]}
            >
              Chờ lấy hàng
            </Text>
            {page === CHOLAYHANG ? (
              <View style={styles.brightbar}></View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.state}
            onPress={() => setPage(CHOGIAOHANG)}
          >
            <Text
              style={[
                styles.textState,
                page === CHOGIAOHANG && styles.textActive,
              ]}
            >
              Chờ giao hàng
            </Text>
            {page === CHOGIAOHANG ? (
              <View style={styles.brightbar}></View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.state}
            onPress={() => setPage(DAGIAOHANG)}
          >
            <Text
              style={[
                styles.textState,
                page === DAGIAOHANG && styles.textActive,
              ]}
            >
              Đã giao hàng
            </Text>
            {page === DAGIAOHANG ? (
              <View style={styles.brightbar}></View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>{renderForm()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  odernav: {
    width: "100%",
    height: 97,
  },
  backOrder: {
    marginTop: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  textOrder: {
    fontSize: 22,
    fontWeight: "500",
    color: 'black'
  },
  imageChat: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  textActive: {
    color: "green",
  },
  oderState: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textState: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 15,
    color: 'black'
  },
  brightbar: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "100%",
    backgroundColor: "green",
    marginLeft: 5,
  },
  body: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#f0f0f0",
  },
  productWait: {
    width: "100%",
    height: 260,
  },
  productInfo: {
    width: "100%",
    height: 120,
    padding: 15,
    flexDirection: "row",
  },
  imageProduct: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  areaImage: {
    height: 100,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  areaName: {
    height: 100,
    width: "70%",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  textProduct: {
    fontSize: 18,
    textAlign: "left",
    color: 'black'
  },
  textAmount: {
    padding: 8,
    fontSize: 18,
  },
  textPrice: {
    fontSize: 18,
    color: "green",
  },
  contact: {
    width: "100%",
    height: 100,
    paddingVertical: 10,
    flexDirection: "row",
  },
  fullNoOrder: {
    width: "100%",
    height: "99%",
    backgroundColor: "rgb(180, 181, 182)",
  },
  areaNoOrder: {
    width: "100%",
    height: "75%",
    backgroundColor: "rgb(180, 181, 182)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ImgNoOrder: {
    width: 110,
    height: 90,
  },
  textNoOrder: {
    fontSize: 14,
    fontWeight: "300",
    marginTop: 15,
  },
  textCon: {
    paddingHorizontal: 20,
    width: "65%",
    height: "100%",
  },
  areaBtn: {
    width: "35%",
    height: "100%",
  },
  payment: {
    width: "100%",
    height: 50,
    padding: 7,
    justifyContent: "center",
    alignItems: "flex-end",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "gray",
    borderBottomColor: "gray",
  },
  textPayment: {
    fontSize: 18,
    color: 'black'
  },
  areaBtn: {
    width: "50",
    height: "30",
    paddingRight: 10,
  },
  btnContactDelevery: {
    width: 130,
    height: 45,
    backgroundColor: globalColors.mainGreen,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContactWait: {
    width: 130,
    height: 45,
    backgroundColor: globalColors.mainGreen,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnContact: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },

  totalPrice: {
    color: "green",
  },
  mess: {
    fontSize: 16,
    fontWeight: "400",
  },
  graySpace: {
    width: "100%",
    height: 10,
    backgroundColor: "rgb(225, 225, 225)",
    marginTop: 0,
  },
});

export default Order;
