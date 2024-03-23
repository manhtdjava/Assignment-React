import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [old, setOld] = useState('');
  const [address, setAdress] = useState('');
  const [pass, setPassword] = useState('');
  const dk = () => {

    if (name.length == 0) {
      Alert.alert('Name không thể để trống...!'); return;
    }
    if (email.length == 0) {
      Alert.alert('Email không thể để trống...!'); return;
    }
    if (phone.length == 0) {
      Alert.alert('Phone không thể để trống...!'); return;
    }
    const isPasswordValid = /^\d+$/.test(phone);
    if (!isPasswordValid) {
      Alert.alert('Lỗi', 'Số điện thoại phải là số');
      return;
    }
    if (old.length == 0) {
      Alert.alert('Tuổi không được để trống...!'); return;
    }
    const isPasswordValid2 = /^\d+$/.test(old);
    if (!isPasswordValid2 || old <= 0) {
      Alert.alert('Lỗi', 'Tuổi không phải là số hoặc nhỏ hơn 0');
      return;
    }
    if (pass.length == 0) {
      Alert.alert('Password không thể để trống...!'); return;
    }
    if (confirm.length == 0) {
      Alert.alert('Confirm không thể để trống...!'); return;
    }
    if (address.length == 0) {
      Alert.alert('Address không thể để trống...!'); return;
    }
    if (pass != confirm) {
      Alert.alert('Password và confirm password không trùng nhau!'); return;
    }
    fetch('http://localhost:3000/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        pass,
        old,
        phone,
        address
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Registration failed');
      })
      .then(data => {
        navigation.pop(1);
        Alert.alert('Success', 'Registered successfully');
      })
      .catch(error => {
        // Xử lý lỗi
        Alert.alert('Error', error.message);
      });
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
      <View style={styles.khung}>
        <Image style={{ width: 200, height: 200, marginBottom: 20 }} source={require('../acces/img/screen1.png')} />
        <Text style={styles.text}>Welcome to Lungo!!</Text>
        <Text style={styles.text1}>Register to continue</Text>
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
          value={phone}
          onChangeText={(text) => {
            return setPhone(text);
          }}

        />
        <TextInput style={styles.input} placeholder='Old...'
          value={old}
          onChangeText={(text) => {
            return setOld(text);
          }}

        />
        <TextInput style={styles.input} placeholder='Address...'
          value={address}
          onChangeText={(text) => {
            return setAdress(text);
          }}

        />
        <TextInput style={styles.input} placeholder='Password...' secureTextEntry={true}
          value={pass}
          onChangeText={(text) => {
            return setPassword(text);
          }}

        />
        <TextInput style={styles.input} placeholder='Confirm password...' secureTextEntry={true}
          value={confirm}
          onChangeText={(text) => {
            return setConfirm(text);
          }}

        />

        <TouchableOpacity style={styles.button}
          onPress={() => {
            dk()
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 30
          }}>Register</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text>You have on accound? Click</Text>
          <Button
            onPress={() => {
              navigation.pop(1);
            }}
            color='#D17842' title='Sign in'></Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register

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
    marginBottom: 30,
    fontWeight: '500'
  }
})