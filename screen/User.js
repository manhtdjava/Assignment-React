import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTab from './BottomTab';

const User = ({ navigation }) => {
    const createTwoButtonAlert = () =>
        Alert.alert('Do you sure you want to exit?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel exit'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);



    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
            <BottomTab />
            <View style={{ width: '100%', alignItems: "center", marginBottom: 35 }}>

                <Text style={{ fontSize: 28, color: 'black', fontWeight: '600' }}>Setting</Text>

            </View>

            <View style={{ marginHorizontal: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../acces/img/screen3.jpeg')} resizeMode="cover" style={{ width: 60, height: 60, borderRadius: 60 }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Trần Đức mạnh</Text>
                        <Text style={{ fontSize: 15, color: '#ccc' }}>manhtdph41895@gmail.com</Text>
                    </View>
                </View>

                <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginTop: 40, marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5, color: '#ccc', fontSize: 20 }}>Chung</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Cẩm nang trồng cây</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Lịch sử giao dịch</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Q & A</Text>
                </TouchableOpacity>

                <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ marginBottom: 5, color: '#ccc', fontSize: 20 }}>Bảo mật và điều khoản</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Điều Khoản và Điều Kiện</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Chính sách quyền riêng tư</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={createTwoButtonAlert}>

                    <Text style={{ marginVertical: 10, fontSize: 18, color: 'red' }}>Đăng xuất</Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default User

const styles = StyleSheet.create({
   
})