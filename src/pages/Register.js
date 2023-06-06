import axios from 'axios';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';

const PRIMARY_COLOR = '#E8542E';
const SECONDARY_COLOR = '#F3F3F3';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {

        if (password != confirmPassword) {
            // Alert.alert("Password does not match")
            Alert.alert("Password does not match")
            setConfirmPassword("");
        } else {
            // const formData = new FormData();
            // formData.append('email', email);
            // formData.append('password', password);
            // formData.append('username', username);
            const data = {name,email,password}
             console.log(data)
            axios.post('http://192.168.12.200:8081/signup', JSON.stringify(data),{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {Alert.alert(res.data.message)
                    setEmail("")
                    setPassword("")
                    setUsername("")
                    setConfirmPassword("")
                }
                )
                .catch(err => Alert.alert('Error'))
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? <Text style={{ color: "#4DB336", fontSize: 18, fontWeight: '600' }}>Login</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: PRIMARY_COLOR,
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 18,
        width: '100%',
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        fontSize: 16,
    },
});