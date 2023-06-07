import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View, Platform, Dimensions, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Btn from '../../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function Output({ navigation, route }) {
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('@storage_Key')
                console.log(value)
                if (value != null) {
                    console.log(value)
                    await axios.get('http://192.168.12.200:8081/', {
                        headers: {
                            Authorization: value
                        }
                    })
                        .then(response => {
                            setUserDetails(response.data)
                            console.log(response.data)
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            } catch (err) {

            }

        }
        fetchData()
    }, [])
    const details = route.params;
    // console.log(details)
    const addToFavorite = async () => {
        const userData = {
            name: details.name,
            email: userDetails.email,
            image: details.src,
            genus: details.genus,
            family: details.family,This is  a change
            order: details.order,
            carbohydrates: details.nutritions.carbohydrates,
            protein: details.nutritions.protein,
            fats: details.nutritions.fat,
            calories: details.nutritions.calories,
            sugar: details.nutritions.sugar
        }
        axios.post("http://192.168.12.200:8081/addfavorite", JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => Alert.alert(res.data))
            .catch(err => Alert.alert(err.data))
    }
    return (
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>

            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: details.src }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{details.name}</Text>
                    <Text style={styles.detail}>Genus: {details.genus ? details.genus : "NA"}</Text>
                    <Text style={styles.detail}>Family: {details.family ? details.family : "NA"}</Text>
                    <Text style={styles.detail}>Order: {details.order ? details.order : "NA"}</Text>
                    <Text style={styles.detail}>Nutritions:</Text>
                    <Text style={styles.detail}>Carbohydrates: {details.nutritions && details.nutritions.carbohydrates !== undefined ? details.nutritions.carbohydrates : "NA"}</Text>
                    <Text style={styles.detail}>Protein: {details.nutritions && details.nutritions.protein !== undefined ? details.nutritions.protein : "NA"}</Text>
                    <Text style={styles.detail}>Fats: {details.nutritions && details.nutritions.fat !== undefined ? details.nutritions.fat : "NA"}</Text>
                    <Text style={styles.detail}>Calories: {details.nutritions && details.nutritions.calories !== undefined ? details.nutritions.calories : "NA"}</Text>
                    <Text style={styles.detail}>Sugar: {details.nutritions && details.nutritions.sugar !== undefined ? details.nutritions.sugar : "NA"}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Btn
                        onPress={() => navigation.push('FruitGenie')}
                        name="Back"
                        bgColor="#E8542E"
                        textColor="white"
                        width="35%"
                        height={40}
                    />
                    <Btn
                        onPress={addToFavorite}
                        name="Add to Favorite"
                        bgColor="#4DB336"
                        textColor="#333"
                        width="45%"
                        height={40}
                        borderColor="#333"
                    />
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 65,
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: '#F3F3F3',
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E8542E',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        width: '80%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',

    },
});