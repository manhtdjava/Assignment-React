import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Username = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('login'); // Lấy token từ AsyncStorage hoặc nơi bạn lưu trữ
                const parsedUserData = JSON.parse(token);
                const loggedInUserId = parsedUserData.email;
                const response = await fetch('http://localhost:3000/Login', {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                const data = await response.json();
                const loggedInUserData = data.find(user => user.email == loggedInUserId);
                setUserData(loggedInUserData); // Lưu thông tin người dùng vào state
                setLoading(false); // Đã lấy dữ liệu xong
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                setLoading(false); // Đã lấy dữ liệu xong (có lỗi)
            }
        };

        fetchProfileData(); // Gọi hàm fetchProfileData để lấy dữ liệu người dùng khi màn hình được hiển thị
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 25 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../acces/img/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: '600' }}>Information</Text>
                <TouchableOpacity >
                    <Text style={{ width: 30, height: 30 }} ></Text>
                </TouchableOpacity>
            </View>
            {userData ? (

                <View style={{ marginHorizontal: 20, marginTop: 60 }}>
                    <View style={{ alignItems: 'center', marginBottom: 40 }}>
                        <Image source={require('../acces/img/screen3.jpeg')} resizeMode='cover' style={{ width: 200, height: 200 }} />
                    </View>
                    <View style={styles.item}>
                        <Text style={{ fontSize: 20 }}>Họ và tên : {userData.name}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ fontSize: 20 }}>Email : {userData.email}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ fontSize: 20 }}>Phone-number : {userData.phone}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ fontSize: 20 }}>Old : {userData.old}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ fontSize: 20 }}>Address : {userData.address}</Text>
                    </View>

                </View>

            ) : (
                <Text>Không có dữ liệu cá nhân</Text>
            )}
        </SafeAreaView>
    )
}

export default Username

const styles = StyleSheet.create({
    item: { width: '100%', height: 40, backgroundColor: "white", justifyContent: 'center', paddingLeft: 20, marginBottom: 20 }
})