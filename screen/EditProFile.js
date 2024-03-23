import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

const EditProFile = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const hanName = (text) => {
        setname(text)
    }
    const hanEmail = (text) => {
        setemail(text)
    }
    const hanAddress = (text) => {
        setaddress(text)
    }
    const hanPhone = (text) => {
        setphone(text)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../acces/img/back.png')} resizeMode='cover' style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>CHỈNH SỬA THÔNG TIN</Text>
                <TouchableOpacity >
                    <Text style={{ width: 20, height: 20 }} ></Text>
                </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', width: '100%', alignItems: "center" }}>
                <View style={{ width: '70%' }}>
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 25 }}>
                        <Image source={require('../acces/img/screen3.jpeg')} resizeMode="cover" style={{ width: 110, height: 110, borderRadius: 110 }} />

                    </View>
                    <Text style={{ fontSize: 15 }}>Thông tin sẽ đươc lưu cho lần mua kế tiếp.</Text>
                    <Text style={{ fontSize: 15 }}>Bấm vào thông tin chi tiết để chỉnh sửa.
                    </Text>

                    <TextInput style={styles.input1}
                        placeholder='Địa chỉ'
                        value={name}
                        onChangeText={hanName}

                    />
                    <TextInput style={styles.input1}
                        placeholder='Địa chỉ'
                        value={email}
                        onChangeText={hanEmail}

                    />
                    <TextInput style={styles.input1}
                        placeholder='Địa chỉ'
                        value={address}
                        onChangeText={hanAddress}

                    />
                    <TextInput style={styles.input1}
                        placeholder='Địa chỉ'
                        value={phone}
                        onChangeText={hanPhone}

                    />
                </View>
            </View>

            <TouchableOpacity style={{ position: 'absolute', bottom: 50, width: '90%', height: 50, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginHorizontal: 20 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>LƯU THÔNG TIN</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default EditProFile

const styles = StyleSheet.create({
    input1: {
        width: '100%',
        height: 40,
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
})