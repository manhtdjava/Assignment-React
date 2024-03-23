// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';

import Home from './screen/Home';
import Register from './screen/Register';
import Product from './screen/Product';
import BottomTab from './screen/BottomTab';
import Cart from './screen/Cart';
import User from './screen/User';
import Like from './screen/Like';
import Username from './screen/Username';
import Pay from './screen/Pay';
import Username2 from './screen/Username2';
import SearchView from './screen/SearchView';
import Notification from './screen/Notification';
import EditProFile from './screen/EditProFile';

const Stack = createNativeStackNavigator();

const Mycomponent = ({ setactiveScreen }) => {
  const navigation = useNavigation()
  useEffect(() => {
    const unsub = navigation.addListener("state", () => {
      const current = navigation.getCurrentRoute().name
      setactiveScreen(current)
      console.log("Active screen: ", current)
    })
    return unsub
  }, [navigation])
}
function App() {
  const [activeScreen, setactiveScreen] = useState("")
  return (
    <NavigationContainer>
      <Mycomponent setactiveScreen={setactiveScreen} />
      <Stack.Navigator initialRouteName='EditProFile' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Like" component={Like} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Username" component={Username} />
        <Stack.Screen name="Username2" component={Username2} />
        <Stack.Screen name="SearchView" component={SearchView} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="EditProFile" component={EditProFile} />
      </Stack.Navigator>


    </NavigationContainer>
  );
}

export default App;