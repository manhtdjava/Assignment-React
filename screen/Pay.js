import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'

const Pay = ({ navigation, route }) => {
  // const { totalPrice } = route.params;
  const [address, setaddress] = useState("")
  const [phone, setphone] = useState("")
  const hanAddress = (text) => {
    setaddress(text)
  };
  const hanPhone = (text) => {
    setphone(text)
  };
  const [check, setcheck] = useState(true);
  const [check2, setcheck2] = useState(true);

  console.log(check);
  return (
    <SafeAreaView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../acces/img/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: '600' }}>Payment</Text>
        <TouchableOpacity >
          <Text style={{ width: 30, height: 30 }} ></Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{totalPrice}</Text> */}
      <ScrollView style={{ height: 640 }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '80%' }}>
            <View style={styles.input}>
              <Text
              >Thông tin khách hàng</Text>
            </View>

            <View style={styles.input1}>
              <Text
              >Trần đức mạnh</Text>
            </View>
            <View style={styles.input1}>
              <Text
              >manhtd@gmail</Text>
            </View>
            <TextInput style={styles.input1}
              placeholder='Địa chỉ'
              value={address}
              onChangeText={hanAddress}

            />
            <TextInput style={styles.input1}
              placeholder='Số điện thoại'
              value={phone}
              onChangeText={hanPhone}
            />
          </View>

          {/* vanchuyen */}
          <View style={{ width: '80%', marginTop: 20 }}>
            <TextInput style={styles.input}
              value="Phương thức Vận chuyển"

            />
            {/* giao nhanh */}


            <TouchableOpacity
              onPress={() => setcheck(!check)}

            >{check ?
              <View style={styles.input2}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: 'green' }}>
                    Giao hàng nhanh - 15.000đ
                  </Text>
                  <Text style={{ color: '#ccc', marginVertical: 10 }}>
                    Dự kiến giao hàng 5-7/9
                  </Text>
                </View>
                <Text style={{ color: 'green', fontSize: 16, width: '10%' }}>√</Text>
              </View>
              :
              <View style={styles.input3}>
                <Text style={{ color: '#ccc' }}>
                  Giao hàng nhanh - 15.000đ
                </Text>
                <Text style={{ color: '#ccc', marginVertical: 10 }}>
                  Dự kiến giao hàng 5-7/9
                </Text>
              </View>
              }
            </TouchableOpacity>

            {/* giao cod */}
            <TouchableOpacity
              onPress={() => setcheck(!check)}

            >{!check ?
              <View style={styles.input2}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: 'green' }}>
                    Giao hàng COD - 20.000đ
                  </Text>
                  <Text style={{ color: '#ccc', marginVertical: 10 }}>
                    Dự kiến giao hàng 4-8/9
                  </Text>
                </View>
                <Text style={{ color: 'green', fontSize: 16, width: '10%' }}>√</Text>
              </View>
              :
              <View style={styles.input3}>
                <Text style={{ color: '#ccc' }}>
                  Giao hàng COD - 20.000đ
                </Text>
                <Text style={{ color: '#ccc', marginVertical: 10 }}>
                  Dự kiến giao hàng 4-8/9
                </Text>
              </View>
              }
            </TouchableOpacity>
          </View>


          {/* thanh toán */}
          <View style={{ width: '80%', marginTop: 20 }}>
            <TextInput style={styles.input}
              value="Phương thức Thanh Toán"

            />
            {/* giao nhanh */}
            <TouchableOpacity
              onPress={() => setcheck2(!check2)}
            >{check2 ?
              <View style={styles.input2}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: 'green', marginBottom: 10 }}>
                    Thẻ VISA/MASTERCARD
                  </Text>
                </View>
                <Text style={{ color: 'green', fontSize: 16, width: '10%' }}>√</Text>
              </View>
              :
              <View style={styles.input2}>
                <Text style={{ color: '#ccc', marginBottom: 10 }}>
                  Thẻ VISA/MASTERCARD
                </Text>

              </View>
              }
            </TouchableOpacity>

            {/* giao cod */}
            <TouchableOpacity
              onPress={() => setcheck2(!check2)}
            >{!check2 ?
              <View style={styles.input2}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: 'green', marginBottom: 10 }}>
                    Thẻ ATM
                  </Text>
                </View>
                <Text style={{ color: 'green', fontSize: 16, width: '10%' }}>√</Text>
              </View>
              :
              <View style={styles.input2}>
                <Text style={{ color: '#ccc', marginBottom: 10 }}>
                  Thẻ ATM
                </Text>

              </View>
              }
            </TouchableOpacity>
          </View>



        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 25, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
          <Text>Tạm tính</Text>
          <Text style={{ fontSize: 17 }}>500.000đ</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
          <Text>Phí vận chuyển</Text>
          <Text style={{ fontSize: 17 }}>500.000đ</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
          <Text>Tổng cộng</Text>
          <Text style={{ color: 'green', fontSize: 17 }}>500.000đ</Text>
        </View>
        <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

export default Pay

const styles = StyleSheet.create({
  item: { borderWidth: 2, borderColor: '#D17842', padding: 20, width: '100%', height: "auto", borderRadius: 20, marginBottom: 20 },
  img: { width: 35, height: 35, marginRight: 20 },
  txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  },
  input: {
    width: '100%',
    height: 40,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold'
  },
  input1: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  input2: {
    width: '100%',
    height: "auto",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    color: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input3: {
    width: '100%',
    height: "auto",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    color: '#ccc'
  }
})