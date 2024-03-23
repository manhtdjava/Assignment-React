import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator , TextInput, Alert, } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Username2 = ({ navigation }) => {
    const [userData, setUserData] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ykien, setykien] = useState("");
    const [old, setOld] = useState("");

    const [loading, setLoading] = useState(false);

   
        const addToCart = async () => {
            let ulePs = "http://localhost:3000/ykien"
            fetch(ulePs, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    ykien: ykien,
                    old: old
                })
            })
                .then((res) => {
                    if (res.status == 201) {
                        Alert.alert('Đã thêm phản hồi');
                        setName('');
                        setEmail('');
                        setykien('')
                        setOld('')
                        return
                    }
                })
                .catch((ex) => {
                    console.log(ex);
                })
        }

       // Gọi hàm fetchProfileData để lấy dữ liệu người dùng khi màn hình được hiển thị
    

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
           

                <View style={{ marginHorizontal: 20, marginTop: 60 }}>
                    <View style={{ alignItems: 'center', marginBottom: 40 }}>
                        <Image source={require('../acces/img/screen3.jpeg')} resizeMode='cover' style={{ width: 200, height: 200 }} />
                    </View>
                    <TextInput style={styles.input} placeholder='Name...'
          value={name}
          onChangeText={(text) => {
            return setName(text);
          }}
        />
        <TextInput style={styles.input} placeholder='Email Address...'
          value={email}
          onChangeText={(text) => {
            return setEmail(text);
          }}
        />
        <TextInput style={styles.input} placeholder='Phone number...'
          value={ykien}
          onChangeText={(text) => {
            return setykien(text);
          }}

        />
        <TextInput style={styles.input} placeholder='Old...'
          value={old}
          onChangeText={(text) => {
            return setOld(text);
          }}

        />
        <TouchableOpacity style={styles.button}
          onPress={() => {
            addToCart()
          }}
          
        ><Text>Gửi phản hồi</Text></TouchableOpacity>

                </View>

         
        </SafeAreaView>
    )
}

export default Username2

const styles = StyleSheet.create({
    item: { width: '100%', height: 40, backgroundColor: "white", justifyContent: 'center', paddingLeft: 20, marginBottom: 20 },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        color: 'black',
        fontSize: 18,
        borderRadius: 10,
        marginBottom: 20
      },
      button: {
        width: '100%',
        height: 50,
        backgroundColor: '#D17842',
        borderRadius: 15,
        justifyContent: 'center', alignItems: 'center',
    
      },
})