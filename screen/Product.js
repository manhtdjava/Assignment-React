import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTab from './BottomTab'

const Product = ({ navigation, route }) => {
    const { item } = route.params;


    const [qty, setqty] = useState(1);
    const [tong, setTong] = useState(item.price)
    const handleQty = (action) => {
        const newQty = qty + action
        setqty(newQty >= 1 ? newQty : 1)
        setTong(Number(newQty * item.price) >= item.price ? Number(newQty * item.price) : item.price)
    };
    const addToCart = async () => {
        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Thêm các header khác nếu cần thiết, ví dụ như token xác thực
            },
            body: JSON.stringify({
                img: item.img,
                name: item.name,
                price: item.price,
                cont: item.cont
            })
        })
            .then((res) => {
                if (res.status == 201) {
                    Alert.alert('Thêm vào giỏ hàng thành công')
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BottomTab />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../acces/img/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Image source={require('../acces/img/store.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            {/* item1 */}
            <View style={{ width: '100%', height: '70%', alignItems: 'center' }}>
                <Image source={require('../acces/img/product-bg/4.png')} resizeMode='cover' style={{ width: '100%', height: 450, opacity: 0.6 }} />
                <View style={{ position: 'absolute', top: 80, left: 110 }}>
                    <Image source={{ uri: item.img }} resizeMode='cover' style={{ width: 200, height: 300 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../acces/img/categories/skincare.png')} resizeMode='cover' style={{ width: 40, height: 40, marginBottom: 8 }} />
                        <Text>Skincare</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../acces/img/categories/cnatural.png')} resizeMode='cover' style={{ width: 40, height: 40, marginBottom: 8 }} />
                        <Text>C+ Natural</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../acces/img/categories/natural.png')} resizeMode='cover' style={{ width: 40, height: 40, marginBottom: 8 }} />
                        <Text>Natural</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.item1}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 23, fontWeight: '700' }}>{item.name}</Text>
                    <TouchableOpacity>
                        <Image source={require('../acces/img/like.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: '300' }}>{item.cont}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '300' }}>
                        <Text style={{ fontSize: 14, fontWeight: '300' }}>134</Text> Reviews
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 23, fontWeight: '700' }}>$ {tong}</Text>
                    <View style={styles.quantity}>
                        <TouchableOpacity onPress={() => handleQty(-1)}>
                            <Text style={{ fontSize: 23, color: '#555' }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 19, color: 'black', fontWeight: '700' }}>{qty}</Text>

                        <TouchableOpacity onPress={() => handleQty(1)}>
                            <Text style={{ fontSize: 23, color: '#555' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.cart} onPress={() => addToCart()}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Product

const styles = StyleSheet.create({
    item: {
        width: 90,
        height: 90,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item1: {
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        padding: 35,
        width: '100%', height: '100%', backgroundColor: 'white'
    },
    quantity: {
        flexDirection: 'row',
        width: 90,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#555',
        borderRadius: 20
    },
    cart: {
        width: 65,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 10
    },
})