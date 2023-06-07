import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert,Dimensions } from "react-native";
import Btn from "../../components/Btn";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get("window");

export default function Login({ navigation }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            console.log("Null")
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const value =  await AsyncStorage.getItem('@storage_Key')
                // console.log(value)
                if (value != null) {
                console.log(value)
                axios.get('http://192.168.97.200:8081/', {
                        headers: {
                            Authorization: value
                        }
                    })
                        .then(response => {
                            navigation.navigate("Tabs")
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }else{
                    console.log(value)
                    console.log("error->login")
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [])
    const handleClick = () => {
        navigation.push("Tabs");
    };
    const handleLogin = () => {
        if (userData.email == '' || userData.password == '') {
            Alert.alert('All fields are required');
            return;
        }
        else {
            axios.post('http://192.168.97.200:8081/signin', JSON.stringify(userData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                const data = res.data;
                if (data.error) {
                    Alert.alert(data.error);
                }
                else {
                    navigation.navigate("Tabs");
                    storeData(data.token)
                }
            })
                .catch(error => {
                    console.error(error+"error")
                })
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                <Text style={styles.headerSecondary}>LO</Text>
                <Text style={styles.headerPrimary}>G</Text>
                <Text style={styles.headerSecondary}>IN</Text>
            </Text>
            <TextInput
                value={userData.email}
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(e) => setUserData({ email: e, password: userData.password })}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="#bbb"
            />
            <TextInput
                value={userData.password}
                style={styles.textInput}
                placeholder="Password"
                onChangeText={(e) => setUserData({ email: userData.email, password: e })}
                secureTextEntry
                placeholderTextColor="#bbb"
            />
            <Btn
                name="Login"
                bgColor="#E8542E"
                textColor="white"
                width="80%"
                height={40}
                onPress={handleLogin}
            />
            <Text style={styles.registerText}>
                Not registered?{" "}
                <Text style={styles.registerLink} onPress={() => navigation.push("Register")}>
                    Register
                </Text>
            </Text>
            <Text style={styles.orText}>or</Text>
            <Btn
                name="Continue as guest"
                bgColor="#4DB336"
                textColor="white"
                width="50%"
                height={40}
                onPress={handleClick}
            />
            <StatusBar barStyle={"light-content"} backgroundColor={"#E8542E"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    headerPrimary: {
        color: "#E8542E",
    },
    headerSecondary: {
        color: "#000",
    },
    textInput: {
        marginVertical: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        width: width * 0.8,
        height: 50,
        paddingHorizontal: 20,
        fontSize: 18,
        color: "#000",
    },
    registerText: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 5,
        color: "#000",
    },
    registerLink: {
        color: "#E8542E",
        fontWeight: "bold",
    },
    orText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 10,
        color: "#000",
    },
});