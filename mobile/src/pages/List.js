import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, SafeAreaView, ScrollView, AsyncStorage, Image, StyleSheet } from 'react-native'
import SpotList from '../components/SpotList';

import logo from '../../assets/logo2.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, [])

  function handleLogout() {
    AsyncStorage.removeItem('user')
    navigation.navigate('Login');
  }

  return <SafeAreaView style={styles.container}>
    <Image style={styles.logo} source={logo}/>

    <ScrollView>
      {techs.map(tech => <SpotList key={tech} tech={tech} />)}
    </ScrollView>

    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  </SafeAreaView>
}

const styles = StyleSheet.create({
   container: {
    flex: 1
   },
   logo :{
     height: 32,
     resizeMode: 'contain',
     alignSelf: 'center',
     marginTop: 10
   },
   button: {
    marginTop: 10,
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});
