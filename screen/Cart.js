import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTab from './BottomTab'

const Cart = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        ds();
    }, []);

    const ds = async () => {
        try {
            setIsLoading(true);
            let url = "http://localhost:3000/users";
            let res = await fetch(url);
            const userData = await res.json();

            // Lấy thông tin giỏ hàng từ dữ liệu người dùng
            const userCart = userData[0]?.carts || [];

            // Lấy danh sách sản phẩm từ API
            url = "http://localhost:3000/products";
            res = await fetch(url);
            const productsData = await res.json();

            // Lọc danh sách sản phẩm dựa trên productIds
            const cartItems = userCart.map(cart => {
                const product = productsData.find(product => product.id == cart.productId);
                return {
                    ...product,
                    quantity: cart.quantity,
                };
            });

            // Cập nhật state data với danh sách sản phẩm trong giỏ hàng
            setData(cartItems);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };



    const handleRefresh = () => {
        setIsRefreshing(true); // Khi người dùng kéo xuống để làm mới, setIsRefreshing(true)
        ds(); // Gọi fetchData để tải lại dữ liệu
        setIsRefreshing(false); // Sau khi tải lại xong, setIsRefreshing(false) để dừng hiển thị biểu tượng làm mới
    };





    const createTwoButtonAlert = (item) =>
        Alert.alert('Are you sure you want to delete?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel exit'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    const newItems = data.filter(dataItem => dataItem.id !== item.id);
                    setData(newItems);
                    Alert.alert('Xóa sản phẩm thành công');
                }
            },
        ]);

    const [check, setCheck] = useState([]);

    const handleCheckItem = (item) => {
        const updatedData = data.map(dataItem => {
            if (dataItem.id == item.id) {
                return {
                    ...dataItem,
                    selected: !dataItem.selected
                };
            } else {
                return dataItem;
            }
        });
        setData(updatedData);
        const filterData = updatedData.filter(value => {
            return value.selected;
        })
        setCheck(filterData);

    };
    const subtotal = check.reduce((total, item) => total + (item.price * item.quantity), 0);
    const formattSutobal = subtotal.toLocaleString();

    const Item = ({ item }) => {
        const handleFilter = data => {
            const filter = data.filter(value => {
                return value.selected;
            });
            setCheck(filter)
        }

        const handleQty = (action) => {
            const newQty = item.quantity + action;
            if (newQty >= 1) {
                const newItems = data.map(dataItem => {
                    if (dataItem.id == item.id) {
                        return {
                            ...dataItem,
                            quantity: newQty
                        };
                    } else {
                        return dataItem;
                    }
                });
                setData(newItems);
                handleFilter(newItems)
            }
        };


        const formattedPrice = (item.price * item.quantity).toLocaleString();

        return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
            <TouchableOpacity
                onPress={() => handleCheckItem(item)}
                style={styles.check}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {item.selected ? '√' : ''}
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#eee', padding: 10, borderRadius: 10 }}>
                <View style={{ width: '27%', height: 100, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>

                    <Image source={require('../acces/img/product-bg/4.png')} resizeMode='cover' style={{ width: '100%', height: '100%', opacity: 0.7 }} />
                    <View style={{ position: 'absolute', top: 15, left: 15 }}>
                        <Image source={{ uri: item.img }} resizeMode='cover' style={{ width: 70, height: 70 }} />
                    </View>
                </View>

                <View style={{ width: '68%', height: 100, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <TouchableOpacity onPress={() => createTwoButtonAlert(item)}>
                            <Text style={{ fontSize: 15, width: 20, height: 20 }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: '300', marginTop: 3 }}>{item.plant}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>$ {formattedPrice}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100, height: 'auto' }}>
                            <TouchableOpacity style={styles.circle} onPress={() => handleQty(-1)}>
                                <Text style={{ fontSize: 23, color: '#555' }}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 19, color: 'black', fontWeight: '700' }}>{item.quantity}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.circle1} onPress={() => handleQty(1)}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    };
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
            <BottomTab />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <TouchableOpacity>
                    <Image source={require('../acces/img/menu.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: '600' }}>Cart</Text>
                <TouchableOpacity>
                    <Image source={require('../acces/img/store.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <Item item={item} />
                    }}
                    // Replace 'productId' with the actual unique identifier property
                    refreshControl={ // Sử dụng RefreshControl để kích hoạt hành động kéo xuống để làm mới
                        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                    }
                />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, marginBottom: 80 }}>
                <Text style={{ fontSize: 22, color: 'black' }}>Subtotal</Text>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '700' }}>$ {formattSutobal}<Text style={{ fontSize: 15, color: 'gray' }}> USD</Text></Text>
                <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Pay', { totalPrice })}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Pay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: '700',
        color: 'black'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle1: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cart: {
        width: 75,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 10
    },
    check: {
        marginRight: 5,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black'
    }
})
