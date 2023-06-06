import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import mime from "mime";
import data from '../../components/data';

const PRIMARY_COLOR = '#E8542E';
const SECONDARY_COLOR = '#F3F3F3';
import Permissions from 'expo-permissions';
const { width } = Dimensions.get('window');


export default function Dashboard({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  
  console.log(route)
  useEffect( () => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasGalleryPermission(galleryStatus.status === 'granted');
      
    })();
  }, []);

  const onSubmit = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }

    const response = await fetch(image);
    const blob = await response.blob();
    //mobile
    const newImageUri = "file:///" + image.split("file:/").join("");
    //web
    const formDataWeb = new FormData();
    formDataWeb.append('image', blob, newImageUri.split("/").pop());

    const formData = new FormData();
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });

    axios
      .post('http://192.168.12.200:5000/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // console.log(data)
        const selectedPlant = data.filter(val => val.name === response.data.results[0].class)[0];
        const data2 = {
          name: `${response.data.results[0].class} ${response.data.results[0].confidence}`,
          id: selectedPlant.id,
          genus: selectedPlant.genus,
          family: selectedPlant.family,
          order: selectedPlant.order,
          src: image,
          nutritions: selectedPlant.nutritions
        }
        setImage(null)
        console.log(response.data)
        navigation.push("Result", data2)
      })
      // "name":response.data.results[0].class+" "+response.data.results[0].confidence,"src":image 
      .catch(function (error) {
        alert(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const clickImage = async () => {
    let result;
    console.log(hasCameraPermission)
    if (hasCameraPermission) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
    } 
    else {
      alert('Sorry, you do not have permission to access the camera roll or camera');
      return;
    }

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholderImage}></View>
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={clickImage}
        >
          <Text style={styles.buttonText}>Take a picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onSubmit}
        >
          <Text style={styles.submitButtonText}>Predict</Text>
        </TouchableOpacity>

      </ScrollView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={PRIMARY_COLOR}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    padding: 20,
    paddingBottom: 60
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E8542E',
  },
  content: {
    flexGrow: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: width * 0.8,
    backgroundColor: '#F3F3F3',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: width * 0.8,
    backgroundColor: '#d0d0d0',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});


