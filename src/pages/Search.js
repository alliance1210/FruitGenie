import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import data from '../../components/data';
import Btn
  from '../../components/Btn';
export default function Search({ navigation }) {
  const [search, setSearch] = useState("");
  const [nutrients, setNutrient] = useState("name");
  const sortData = data.filter(item => item.name.toLowerCase().includes(search?.trim().toLowerCase()))
    .sort((a, b) => {
      if (nutrients === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return b.nutritions[nutrients] - a.nutritions[nutrients];
      }
    });
  const searchByNutrients = (name) => {
    setNutrient(name)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Fruits</Text>
      <View style={styles.searchContainer}>
        <Ionicons style={styles.searchIcon} name="search" size={20} color="#555" />
        <TextInput style={styles.searchInput} value={search} onChange={(e) => {
          setSearch(e.nativeEvent.text)
        }} placeholder="Search Fruits" />

      </View>
      <View style={styles.btnContainer}>
        <Btn
          name="Protein"
          bgColor="#E8542E"
          textColor="white"
          width="25%"
          height={40}
          onPress={() => searchByNutrients('protein')}
        />
        <Btn
          name="Carbs"
          bgColor="#E8542E"
          textColor="white"
          width="25%"
          height={40}
          onPress={() => searchByNutrients('carbohydrates')}
        />
        <Btn
          name="Fats"
          bgColor="#E8542E"
          textColor="white"
          width="25%"
          height={40}
          onPress={() => searchByNutrients('fat')}
        />
      </View>
      <View style={styles.btnContainer}>
        <Btn
          name="Sugar"
          bgColor="#E8542E"
          textColor="white"
          width="25%"
          height={40}
          onPress={() => searchByNutrients('sugar')}
        />
        <Btn
          name="Calories"
          bgColor="#E8542E"
          textColor="white"
          width="25%"
          height={40}
          onPress={() => searchByNutrients('calories')}
        />
        <Btn
          name="Defaut"
          bgColor="#4DB336"
          textColor="white"
          width="25%"
          height={40}
          onPress={() => searchByNutrients('name')}
        />
      </View>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity> */}
      <View style={styles.divider} />

      <ScrollView vertical={true} showsVerticalScrollIndicator={true} >
        {sortData.map((item) => (
          <View key={item.id} >
            <TouchableOpacity onPress={() => navigation.navigate('Result', item)}>
              <Text style={{ fontSize: 18, }}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.91,
    padding: 20,
    // paddingBottom:65,
    backgroundColor: '#fff',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E8542E',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#555',
  },
  button: {
    backgroundColor: '#E8542E',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
    mraginTop: 10,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E8542E',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 18,
    marginRight: 10,
    color: '#555',
  },
  filterButton: {
    backgroundColor: '#4DB336',
    borderRadius: 5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});