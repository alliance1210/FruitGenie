import React from 'react';
import {
 View, Text,
 SafeAreaView
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';


//Pages
import Dashboard from './src/pages/Dashboard';
import Profile from './src/pages/Profile';
import Search from './src/pages/Search';
import Output  from './src/pages/Output';

const Tab = createBottomTabNavigator();

const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const DashboardStackScreen = ({navigation}) => {
 return (
     <DashboardStack.Navigator initialRouteName='FruitGenie'>
       <DashboardStack.Screen
         name="FruitGenie"
         component={Dashboard}
         options={()=>({ 
          headerShown: true,
          headerLeft: null,
         
          headerStyle: {
            backgroundColor: '#E8542E',
            elevation: 2,
            height: 60
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            marginLeft: 0,
            textAlign: "left",
            fontSize: 20,
          },
        })} />
        <DashboardStack.Screen
         name="Result"
         component={Output}
         options={()=>({ 
          headerShown: true,
          headerLeft: null,
         
          headerStyle: {
            backgroundColor: '#E8542E',
            elevation: 2,
            height: 60
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            marginLeft: 0,
            textAlign: "center",
            fontSize: 20,
          },
        })} />
     </DashboardStack.Navigator>
   
 );
};
const ProfileStackScreen = ({navigation}) => {
   return (
       <ProfileStack.Navigator initialRouteName='Profile'>
         <ProfileStack.Screen
           name="Profile"
           component={Profile}
           options={()=>({ 
            headerShown: true,
            headerLeft: null,
           
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
         {/* <ProfileStack.Screen
           name="Favourite"
           component={NewPage}
           options={()=>({ 
            headerShown: true,
            headerLeft: null,
           
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
          })} /> */}

       </ProfileStack.Navigator>
   );
};
const SearchStackScreen = ({navigation}) => {
   return (
       <SearchStack.Navigator>
         <SearchStack.Screen
           name="Search"
           component={Search}
           options={()=>({ 
            headerShown: true,
            headerLeft: null,
           
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
       </SearchStack.Navigator>
   );
 };

const Tabs = () => {
 return (
   <View style={{ flex: 1, backgroundColor: "#fff" }}>
     <Tab.Navigator
       initialRouteName="Dashboard"
       tabBarOptions={{
         showLabel: false,
         keyboardHidesTabBar: true,
         style: {
           position: 'absolute',
           elevation: 5,
           height: 60,
           backgroundColor: '#fff',
         },
       }}>
         <Tab.Screen
           name="Dashboard"
           component={DashboardStackScreen}
           options={({navigation}) => ({
               tabBarIcon: ({focused}) =>
                 focused ? (
                   <View style={{alignItems:"center"}}>
                     <Text style={{color:"#222", fontWeight:"bold", fontSize: 12}}>Dashboard</Text>
                   </View>
                 ) : (
                   <View style={{alignItems:"center"}}>
                     <Text style={{color:"#222", fontSize: 12}}>Dashboard</Text>
                   </View>
                 ),
             })}
         /> 
         <Tab.Screen
           name="Search"
           component={SearchStackScreen}
           options={({navigation}) => ({
               tabBarIcon: ({focused}) =>
                 focused ? (
                   <View style={{alignItems:"center"}}>
                     <Text style={{color:"#222", fontWeight:"bold", fontSize: 12}}>Search</Text>
                   </View>
                 ) : (
                   <View style={{alignItems:"center"}}>
                     <Text style={{color:"#222", fontSize: 12}}>Search</Text>
                   </View>
                 ),
             })}
         />
         <Tab.Screen
           name="Profile"
           component={ProfileStackScreen}
           options={({navigation}) => ({
               tabBarIcon: ({focused}) =>
                 focused ? (
                   <View style={{alignItems:"center"}}>
                     <Text style={{color:"#222", fontWeight:"bold", fontSize: 12}}>Profile</Text>
                   </View>
                 ) : (
                   <View style={{alignItems:"center"}}>
                     <Text style={{color:"#222", fontSize: 12}}>Profile</Text>
                   </View>
                 )
             })}
         />
     </Tab.Navigator>
   </View>
 );
};

export default Tabs;