import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Button, StatusBar, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Btn from '../../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Profile({ navigation, route }) {
  const [userDetails, setUserDetails] = useState({})
  const [userData,setUserData] = useState([])
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value)
      if (value != null ) {
        console.log(value)
        const response1 = await axios.get('http://192.168.97.200:8081/', {
          headers: {
            Authorization: value
          }
        })
        setUserDetails(response1.data)
        const response2 = await axios.post('http://192.168.97.200:8081/getfavorite',JSON.stringify({email:response1.data.email}), {
          headers: {
              'Content-Type': 'application/json'
          }
        })
        setUserData(response2.data)
      } else {
        logout();
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      console.log("error", value)
    }
  }
  const handleRemove = (_id) => {
    if(userData.length === 1){
      setUserData([]);
    }
    console.log("ID: ",_id)
    axios.post('http://192.168.97.200:8081/removefavourite',JSON.stringify({_id:_id}), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { Alert.alert(res.data)
        fetchData()}
        )
        .catch(err => Alert.alert(err.data))
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const logout = async () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E8542E" barStyle="dark-content" />
      <ScrollView style={styles.content}>
        <View style={{ flex: 1, flexDirection: "row-reverse", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userDetails.name}</Text>
            <Text style={styles.email}>{userDetails.email}</Text>
          </View>

        </View>
        <View style={styles.favorites}>
          {userData.length === 0?<View style={{flex:1,justifyContent:'center',alignItems:'center', height:300}}><Text >Empty</Text></View>:userData.map((favorite) => (
            favorite.favorites.map(item=>(
              <View style={styles.favoriteItem} key={item._id}>
                <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                <View style={styles.favoriteDetails}>
                  <Text style={styles.favoriteName}>Name: {item.name}</Text>
                  <Text style={styles.favoriteGenus}>Genus: {item.genus} ({item.family}) - {item.order}</Text>
                  <Text style={styles.favoriteGenus}>Family: {item.family} - {item.order}</Text>
                  <Text style={styles.favoriteGenus}>Order: {item.order}</Text>
                  <View style={styles.nutrition}>
                    <Text style={styles.nutritionTitle}>Nutrition:</Text>
                    <Text style={styles.nutritionValue}>Carbohydrates: {item.nutrition.carbohydrates}g</Text>
                    <Text style={styles.nutritionValue}>Protein: {item.nutrition.protein}g</Text>
                    <Text style={styles.nutritionValue}>Fats: {item.nutrition.fats}g</Text>
                    <Text style={styles.nutritionValue}>Calories: {item.nutrition.calories}</Text>
                    <Text style={styles.nutritionValue}>Sugar: {item.nutrition.sugar}g</Text>
                  </View>
                  <TouchableOpacity style={styles.removeButton}>
                    <Text style={styles.removeButtonText} onPress={()=>handleRemove(favorite._id) }>Remove</Text>
                  </TouchableOpacity>
                </View>
            </View>

            ))
          ))}
         </View> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 65
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 16,
    color: '#E8542E',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  userInfo: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
  favorites: {
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  favoriteAccuracy: {
    fontSize: 16,
    marginBottom: 5,
  },
  favoriteGenus: {
    fontSize: 16,
    marginBottom: 5,
  },
  nutrition: {
    marginTop: 10,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nutritionValue: {
    fontSize: 16,
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: '#E8542E',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  removeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});