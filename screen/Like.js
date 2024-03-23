import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ImageBackground, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTab from './BottomTab'

const Like = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const ds = async () => {
        try {
            setIsLoading(true)
            let url = "http://localhost:3000/Like";
            let res = await fetch(url);
            const data2 = await res.json();
            setData(data2);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const addToCart = async ({ item }) => {

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
    }
    const handleRefresh = () => {
        setIsRefreshing(true); // Khi người dùng kéo xuống để làm mới, setIsRefreshing(true)
        ds(); // Gọi fetchData để tải lại dữ liệu
        setIsRefreshing(false); // Sau khi tải lại xong, setIsRefreshing(false) để dừng hiển thị biểu tượng làm mới
    };
    useEffect(() => { ds() }, []);
    const Item = ({ item }) => {
        const dele = () => {
            let urlDle = "http://localhost:3000/Like/" + item.id;
            fetch(urlDle, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (res.status == 200) {
                        Alert.alert('Xóa yêu thích thành công!');
                    }
                })
                .catch((ex) => {
                    console.log(ex);
                })
        }
        const createTwoButtonAlert = () =>
            Alert.alert('Are you sure you want to delete favorites?', '', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel exit'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => dele() },
            ]);
        return <View style={{ width: '100%', height: 450, alignItems: 'center', marginBottom: 30 }}>
            <View style={styles.image}>
                <View style={{ width: '90%', height: '90%', alignItems: 'center', justifyContent: 'center', }} >
                    <Image source={require('../acces/img/product-bg/4.png')} resizeMode="cover" style={{ width: '100%', height: '100%', opacity: 0.7 }} />
                    <Image source={{ uri: item.img }} resizeMode="cover" style={{ width: '70%', height: '70%', position: 'absolute' }} />
                </View>

                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={() => createTwoButtonAlert()}>
                    <Image source={require('../acces/img/like.png')} resizeMode="cover" style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
                <View style={{ width: '100%', height: 150, backgroundColor: '#ccc', position: 'absolute', bottom: 0, borderRadius: 25, opacity: 0.9, padding: 25 }}>
                    <Text style={{ fontSize: 30, }}>{item.name}</Text>
                    <Text style={{ fontSize: 18, }}>{item.cont}</Text>
                    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: '700' }}>$ {item.price}</Text>
                        <TouchableOpacity style={styles.cart} onPress={() => addToCart({ item })}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BottomTab />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 25 }}>
                <TouchableOpacity >
                    <Image source={require('../acces/img/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: '600' }}>Favorites</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Image source={require('../acces/img/store.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    // columnWrapperStyle={styles.row}
                    style={{ marginBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <Item item={item} />
                    }}
                    keyExtractor={item => item.id}
                    refreshControl={ // Sử dụng RefreshControl để kích hoạt hành động kéo xuống để làm mới
                        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default Like

const styles = StyleSheet.create({

    image: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'repeat'
        backgroundColor: 'white',
        width: '90%',
        height: '100%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
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