import React from "react";
import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function StatusBarComponent(){
    return(
        <View>
            <StatusBar style="light"
            backgroundColor="red"
        />
        </View>
    )
}