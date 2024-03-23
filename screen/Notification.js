import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import BottomTab from './BottomTab';

const Notification = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([
        {
            img: '',
            name: 'San pham 1',
            price: '250.00',
            cont: 'ksjdhjfh'
        }
    ]);


    const Item = ({ item }) => {
        return <View>
            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 15 }}>
                <View style={styles.iput}>
                    <TextInput style={{ height: 25 }}
                        value='sàghasgh'
                    />
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#eee', padding: 10, borderRadius: 10 }}>
                <View style={{ width: '27%', height: 100, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>

                    <Image source={require('../acces/img/product-bg/4.png')} resizeMode='cover' style={{ width: '100%', height: '100%', opacity: 0.7 }} />
                    {/* <View style={{ position: 'absolute', top: 15, left: 15 }}>
                    <Image source={{ uri: item.img }} resizeMode='cover' style={{ width: 70, height: 70 }} />
                </View> */}
                </View>

                <View style={{ width: '68%', height: 100, justifyContent: 'space-around' }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>$ {item.price}</Text>
                    <Text style={styles.text}>{item.cont}</Text>
                </View>
            </View>
        </View>
    };
    return (
        <SafeAreaView style={{ paddingHorizontal: 15, flex: 1 }}>
            <BottomTab />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity >
                    <Image source={require('../acces/img/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: '600' }}>Notification</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>

                </TouchableOpacity>
            </View>


            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <Item item={item} />
                }}

            />
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    iput: {
        height: 40,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        // justifyContent: 'center',
        paddingLeft: 20,
        alignItems: 'center'
    },
    row: {
        flex: 1,
        justifyContent: 'space-between'
    }
})