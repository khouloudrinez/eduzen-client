import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import BottomNavBar from '../components/BottomNavBar';
import { UserContext } from "./UserContext";

const EditProfile = ({ navigation, route  }) => {
    const currentScreen = route.name;
  
    const { user, updateUser } = useContext(UserContext);
    const [updatedUser, setUpdatedUser] = useState(user);



    const handleSave = () => {
      updateUser(updatedUser);
      navigation.navigate('MyProfile');
    };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier mon profil</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Information générale</Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={updatedUser.firstName}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={updatedUser.lastName}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, lastName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date de naissance"
            value={updatedUser.dateOfBirth}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, dateOfBirth: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Genre"
            value={updatedUser.gender}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, gender: text })}
          />
          <Text style={styles.label}>Contact et adresse</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={updatedUser.email}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, email: text })}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            value={updatedUser.phone}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Rue"
            value={updatedUser.street}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, street: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ville"
            value={updatedUser.city}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Code Postal"
            value={updatedUser.postalCode}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, postalCode: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Pays"
            value={updatedUser.country}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, country: text })}
          />
          <Text style={styles.label}>Éducation</Text>
          <TextInput
            style={styles.input}
            placeholder="Niveau Scolaire"
            value={updatedUser.educationLevel}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, educationLevel: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="École"
            value={updatedUser.school}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, school: text })}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} currentScreen={currentScreen}  />
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width : width
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default EditProfile;
