import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BottomTab = () => {
    const navication = useNavigation();
    return (
        <View style={styles.cantainer}>
            <TouchableOpacity onPress={() => navication.navigate("Home")}>
                <Image source={require('../acces/img/home.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navication.navigate("Cart")}>
                <Image source={require('../acces/img/shopping-cart.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navication.navigate("Like")}>
                <Image source={require('../acces/img/heart.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navication.navigate("User")}>
                <Image source={require('../acces/img/user.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({
    cantainer: {
        position: 'absolute',
        width: '80%',
        height: 65,
        backgroundColor: '#130d2d',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 15,
        bottom: 25,
        left: 60,
        flexDirection: 'row',
        zIndex: 10000

    }
})