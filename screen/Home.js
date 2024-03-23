import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'
import BottomTab from './BottomTab'
const Home = ({ navigation, route }) => {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const hanSearch = (text) => {
        setSearch(text)
    };

    // data 1
    const [data1, setData1] = useState([
        {
            id: 'b0',
            title: 'Body-lotions',
        },
        {
            id: 'b1',
            title: 'Categores',
        },
        {
            id: 'b2',
            title: 'Facial-clearser',
        },
        {
            id: 'b3',
            title: 'Perfumes',
        },
        {
            id: 'b4',
            title: 'Product-BG',
        },
    ]);

    //data2
    const [data2, setData2] = useState([]);
    const ds = async () => {
        try {
            setIsLoading(true);
            let url = "http://localhost:3000/product";
            let res = await fetch(url);
            const data2 = await res.json();
            setData2(data2);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    useEffect(() => { ds() }, []);
    const handleRefresh = () => {
        setIsRefreshing(true); // Khi người dùng kéo xuống để làm mới, setIsRefreshing(true)
        ds(); // Gọi fetchData để tải lại dữ liệu
        setIsRefreshing(false); // Sau khi tải lại xong, setIsRefreshing(false) để dừng hiển thị biểu tượng làm mới
    };

    const addToCart = async ({ item }) => {
        let ulePs = "http://localhost:3000/Like"
        fetch(ulePs, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                    Alert.alert('Đã yêu thích sản phẩm'); return
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    }
    const Item = ({ item }) => {
        return <View style={{ width: '47%', height: 'auto', backgroundColor: 'white', borderRadius: 10, padding: 15, marginBottom: 20 }}

        >
            <TouchableOpacity onPress={() => navigation.navigate('Product', { item })}>
                <Image style={{ width: '100%', height: 200 }} source={{ uri: item.img }} />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, color: 'black', fontWeight: 600, marginVertical: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: 'black', fontWeight: 400, marginBottom: 10 }}>{item.content}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>$ {item.price}</Text>
                <TouchableOpacity onPress={() => addToCart({ item })}>
                    <Image style={{ width: 25, height: 25 }} source={require('../acces/img/like.png')} resizeMode='cover' />
                </TouchableOpacity>

            </View>

        </View>
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 15, flex: 1 }}>
            <BottomTab />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity >
                    <Image source={require('../acces/img/menu.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: '600' }}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Username2')}>
                    <Image source={require('../acces/img/screen3.jpeg')} resizeMode='cover' style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>
            {/* item2 */}

            {/* item scrollhodico */}


            <FlatList
                style={{ marginVertical: 20, height: 40 }}
                horizontal={true}
                data={data1}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: 16, marginRight: 20 }}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                }}
                keyExtractor={item => item.id}
            />

            {/* item store */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    numColumns={2}
                    data={data2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 60 }}
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

export default Home

const styles = StyleSheet.create({
    iput: {
        height: 40,
        flexDirection: 'row',
        width: '82%',
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        justifyContent: 'space-between'
    }
})