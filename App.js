import React, { useEffect } from "react";
import { NavigationContainer,StatusBar } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
//Pages
import Login from "./src/pages/Login";

import Tabs from "./Tabs";
import Register from "./src/pages/Register";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={()=>({ 
          headerShown: true,
          // headerLeft: null,
         
          headerStyle: {
            backgroundColor: '#E8542E',
            elevation: 2,
            height: 60
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            marginLeft: 7,
            textAlign: "left",
            fontSize: 20,
          },
        })} />
        <Stack.Screen name="Register" component={Register} options={()=>({ 
          headerShown: true,
          // headerLeft: null,
         
          headerStyle: {
            backgroundColor: '#E8542E',
            elevation: 2,
            height: 60
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            marginLeft: 7,
            textAlign: "left",
            fontSize: 20,
          },
        })} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

