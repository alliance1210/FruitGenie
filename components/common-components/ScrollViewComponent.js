import React from "react";

import { View, ScrollView } from "react-native";

export default function ScrollViewComponent() {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ margin: 50 }}>
        <View
          style={{
            height: 100,
            borderColor: 'red',
            borderWidth: 2,
            width: 100,
            marginLeft: 10
            // display:"flex",flexDirection:"row",justifyContent:"center", width:"100%"
          }}
        >
        </View>
        <View
          style={{
            height: 100,
            borderColor: 'red',
            borderWidth: 2,
            width: 100,
            marginLeft: 10
            // display:"flex",flexDirection:"row",justifyContent:"center", width:"100%"
          }}
        >
        </View>
        <View
          style={{
            height: 100,
            borderColor: 'red',
            borderWidth: 2,
            width: 100,
            marginLeft: 10
            // display:"flex",flexDirection:"row",justifyContent:"center", width:"100%"
          }}
        >
        </View>
        <View
          style={{
            height: 100,
            borderColor: 'red',
            borderWidth: 2,
            width: 100,
            marginLeft: 10
            // display:"flex",flexDirection:"row",justifyContent:"center", width:"100%"
          }}
        >
        </View>
        <View
          style={{
            height: 100,
            borderColor: 'red',
            borderWidth: 2,
            width: 100,
            marginLeft: 10
            // display:"flex",flexDirection:"row",justifyContent:"center", width:"100%"
          }}
        >
        </View>

      </ScrollView>
    </View>
  )
}