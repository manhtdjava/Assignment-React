import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from './BottomTab';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {
    if (email.length == 0) {
      Alert.alert('Chưa nhập email!')
        ; return;
    }
    if (password.length == 0) {
      Alert.alert('Chưa nhập pass!'); return;
    }
    let url = "http://localhost:3000/users?email=" + email;
    fetch(url)
      .then((res) => { return res.json(); })
      .then(async (res_login) => {
        if (res_login.length != 1) {
          Alert.alert('Sai email hoặc lỗi trùng lặp dữ liệu!'); return;
        } else {
          let obju = res_login[0];
          if (obju.password != password) {
            Alert.alert('Sai pass!');
            console.log(password);
            console.log(obju.pass);
            return;
          } else {
            try {
              await AsyncStorage.setItem('login', JSON.stringify(obju));
              let userId = obju.id;
              navigation.navigate('Home', { userId });
              console.log("usid " + userId);
            } catch (e) {
              // saving error
              console.log(e);
            }


          }
        }
      })
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

      <View style={styles.khung}>
        <Image style={{ width: 200, height: 200, marginBottom: 20 }} source={require('../acces/img/screen1.png')} />
        <Text style={styles.text}>Welcome to Lungo!!</Text>
        <Text style={styles.text1}>Login to continue</Text>
        <TextInput style={styles.input} placeholder='Email Address'
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => {
            return setEmail(text);
          }}
        />
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true}
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => {
            return setPassword(text);
          }}
        />
        <TouchableOpacity style={styles.button}
          onPress={doLogin}
        >
          <Text style={{
            color: 'white',
            fontSize: 30
          }}>Sign In</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Don't have account? Click</Text>
          <Button
            onPress={() => {
              navigation.navigate('Register');
            }}
            color='#D17842' title='Register'></Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  khung: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
    marginTop: 40
  },
  text: {
    fontSize: 25,
    color: 'black',
    marginBottom: 15,
    fontWeight: '700'
  },
  text1: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 80,
    fontWeight: '500'
  }
})