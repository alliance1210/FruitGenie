import React from "react";
import { View, ImageBackground, Text } from "react-native";

export default function ImageBackgroundComponent() {
    return (
        <View style={{ flexDirection:"column", alignItems:'center',height:200, width:'100%'}}>
            <ImageBackground style={{width:'100%', height:500, flex:1, justifyContent:'center',alignItems:'center'}} source={require('../../src/assets/gradient.png')} resizeMode="cover">
                <Text style={{ color: 'white' }}>
                    Hello
                </Text>
                <Text style={{ color: 'white' }}>
                    Hello
                </Text>
            </ImageBackground>

        </View>
    )
}