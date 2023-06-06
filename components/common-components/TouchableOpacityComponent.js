import React,{useState} from "react";
import { View, Text, TouchableOpacity,TouchableWithoutFeedback } from "react-native";

export default function TouchableOpacityComponent() {
    const [name,setName] = useState(false)
    const onPress = ()=>{
        setName((prev)=>!prev)
    }
    return (
        <View>
        <View
        style={{display: 'flex', flexDirection:'row',textAlign:'center', justifyContent:'center',width:'100%'}}
        >
            <TouchableWithoutFeedback onPress={onPress}>
                <Text style={{marginRight:10}}>Click here</Text>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={onPress}>
                <Text>Click here</Text>
            </TouchableOpacity>
            
        </View>
        <Text style={{marginLeft:130, marginTop:20}}>
                {name&&'Hello Pradei'}
            </Text>
        </View>
    )
}