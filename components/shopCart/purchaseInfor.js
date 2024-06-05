import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { places } from "./place";
import BackBtn from "../backBtn";
import { ipAddress } from "../../ip/ip";
import { globalColors } from "../../styles/Colors";

const PurchaseInfor = ({ navigation, route }) => {
    const { selectedItems, totalPrice, shippingFee, totalPayment, userID } = route.params;
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm();

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const textErr = "Vui lòng điền đủ thông tin";

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${ipAddress}/userInfor/${userID}`);
            const result = await response.json();
            if (result.success) {
                const { UserName, UserEmail, Number } = result.data;
                setValue("name", UserName);
                setValue("email", UserEmail);
                setValue("phone", Number);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userID]);

    const onSubmit = async (data) => {
        try {
            const promises = selectedItems.map(async (item) => {
                const response = await fetch(`${ipAddress}/purchase`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        ...item,
                        UserID: userID,
                    }),
                });
                return await response.json();
            });

            const responses = await Promise.all(promises);
            Alert.alert('Đặt hàng thành công');

            navigation.navigate('HomeTabs', { screen: 'Shop', params: { userID } });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const selectedCity = watch("city");
    const selectedDistrict = watch("district");
    const selectedWard = watch("ward");
    const address = watch("address");
    const formattedAddress = `${address}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`;

    useEffect(() => {
        setCities(Object.keys(places).map((key) => ({ id: key, name: key })));
    }, []);

    useEffect(() => {
        if (selectedCity) {
            setDistricts(
                Object.keys(places[selectedCity]).map((key) => ({
                    id: key,
                    name: key,
                }))
            );
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            setWards(
                places[selectedCity][selectedDistrict].map((ward, index) => ({
                    id: index.toString(),
                    name: ward,
                }))
            );
        }
    }, [selectedCity, selectedDistrict]);

    return (
        <ScrollView style={styles.container}>
            <BackBtn onPress={() => navigation.navigate('ShopCart', {userID})} />
            <Text style={{ fontSize: 30, color: globalColors.mainGreen, textAlign: 'center', paddingBottom: 20, fontWeight: '500' }}>Thông tin sản phẩm</Text>
            <View style={styles.proTable}>
                <View style={styles.table}>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.label, styles.header, styles.plantName]}>Tên sản phẩm</Text>
                        <Text style={[styles.label, styles.header, styles.quantity]}>Số lượng</Text>
                        <Text style={[styles.label, styles.header, styles.priceProduct]}>Giá tiền</Text>
                    </View>
                    {selectedItems.map((item, index) => {
                        const PriceAndQuantity = item.Price * item.Quantity;
                        return (
                            <View key={index} style={styles.row}>
                                <Text style={[styles.plantName]}>{item.ProductName}</Text>
                                <Text style={[styles.quantity]}>{item.Quantity}</Text>
                                <Text style={[styles.priceProduct, { color: 'red' }]}>{item.Price.toLocaleString()} đ</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{ width: '100%', marginTop: 10 }}>
                    <View style={styles.totalPrice}>
                        <Text style={styles.textPrice}>Tổng tiền:</Text>
                        <Text style={styles.price}>{totalPrice} VNĐ</Text>
                    </View>
                    <View style={styles.totalPrice}>
                        <Text style={styles.textPrice}>Phí vận chuyển:</Text>
                        <Text style={styles.price}>{shippingFee} VNĐ</Text>
                    </View>
                    <View style={styles.totalPrice}>
                        <Text style={styles.textPrice}>Tổng thanh toán:</Text>
                        <Text style={styles.price}>{totalPayment} VNĐ</Text>
                    </View>
                </View>
            </View>

            {/* form */}
            <View style={styles.formGroup}>
                <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 20, color: globalColors.mainGreen, fontWeight: '500' }}>Điền thông tin</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Họ và tên"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="name"
                />
                {errors.name && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Số điện thoại"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="numeric"
                        />
                    )}
                    name="phone"
                />
                {errors.phone && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Số nhà, tên đường"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="address"
                />
                {errors.address && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => onChange(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Chọn tỉnh / thành" value="" />
                                {cities.map((city) => (
                                    <Picker.Item
                                        key={city.id}
                                        label={city.name}
                                        value={city.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )}
                    name="city"
                />
                {errors.city && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => onChange(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Chọn quận / huyện" value="" />
                                {districts.map((district) => (
                                    <Picker.Item
                                        key={district.id}
                                        label={district.name}
                                        value={district.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )}
                    name="district"
                />
                {errors.district && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => onChange(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Chọn phường / xã" value="" />
                                {wards.map((ward) => (
                                    <Picker.Item
                                        key={ward.id}
                                        label={ward.name}
                                        value={ward.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )}
                    name="ward"
                />
                {errors.ward && <Text style={styles.errorText}>{textErr}</Text>}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Mua hàng</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  proTable: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 2,
  },
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  header: {
    color: 'black',
  },
  plantName: {
    flex: 1,
    fontSize: 16
  },
  priceProduct: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16
  },
  totalPrice: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  textPrice: {
    fontSize: 16,
    color: 'black'
  },
  price: {
    fontSize: 16,
    color: 'red',
    paddingLeft: 10
  },
  formGroup: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "#4D8D6E",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#4D8D6E",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#4D8D6E",
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
  },
});

export default PurchaseInfor;
