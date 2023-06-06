import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TextInputComponent() {
    const [input, setInput] = useState()
    const [name, setName] = useState('')
    const clearAll = async () => {
        await AsyncStorage.clear()
        console.log('Cleared.')
    }
    const change = (e) => {
        setInput(e)
    }
    const saveString = () => {
        AsyncStorage.setItem('name', input)
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name')
            if (value !== null) {
                setName(value)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <View>
            <TextInput
                value={input}
                onChangeText={(e) => change(e)}
                style={styles.input}
                placeholder="Enter your name"
            />
            <Text style={{ marginLeft: 20 }}>
                {name!==''&&'Welcome '+name}
            </Text>
            <Button onPress={saveString} title="Save" />
            <Button onPress={clearAll} title="Clear" />
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});


// import React, {Component} from 'react';  
// import { Text, View, TextInput, Button } from 'react-native';  
// import AsyncStorage from '@react-native-async-storage/async-storage';
  
// export default class App extends Component {  
//   constructor(props) {
//     super(props);
//     this.state = { name: "" };
//   }
//     changeName = (e) => {
//       this.setState({name: e})  
//       //console.log(this.state.name)
//     }
//     storeData = async () => {
//       let name = this.state.name;
//       await AsyncStorage.setItem('userName', name)
//       //console.log("Data Saved ====>", JSON.stringify(name))
//     }
//     componentDidMount = async() => {
//       let data = await AsyncStorage.getItem('userName')
//       if(data) {
//         console.log("Saved Data is =====>", data)
//         this.setState({
//           name: data
//         })
//       }
//     }
//     render() {  
//         return (  
//             <View style={{marginTop: 50, marginLeft: 10, marginRight: 10}}>  
//                 <Text style={{fontSize: 15, marginBottom: 10}}> Hello {this.state.name} </Text>  
//                 <TextInput
//                   style={{height: 40, width: 200, color: "blue", borderWidth: 1, borderColor:"gray", borderRadius: 6, paddingLeft: 10, marginBottom: 15}}
//                   value={this.state.name}
//                   onChangeText={(e) => this.changeName(e)}
//                   placeholder={"Enter Name"}
//                 />
//                 <Button
//                   title='Save'
//                   style={{marginTop: 10}}
//                   onPress={this.storeData}
//                 />
//             </View>  
//         );  
//     }  
// }  