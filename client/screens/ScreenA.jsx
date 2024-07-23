import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import exampleImage from '../assets/logo.png';

const ScreenA = ({ navigation   }) => {

  const showAlert = () => {
    Alert.alert('Information','Bientôt disponible');
  };

  
  return (
    <View style={styles.container}>
      <Image 
        source={exampleImage} 
        style={styles.image} 
        resizeMode="contain" 
      />
      {console.log('object')}
      <Text style={styles.welcomeText}>Bienvenue</Text>
      <Text style={styles.instructionText}>Avant de commencer, veuillez identifier votre profil</Text>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('ScreenB')} >
        <Text style={styles.buttonText}>Etudiant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Ecole</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Coach</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Professionnel</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: width * 0.4,
    height: height * 0.3,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2F2B4A',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ScreenA;