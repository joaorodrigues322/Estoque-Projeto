import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Login'); // CORRETO
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});