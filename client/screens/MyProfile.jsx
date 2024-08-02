import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Linking, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '@env';
import BottomNavBar from '../components/BottomNavBar';
import { UserContext } from "./UserContext";
import { BlurView } from 'expo-blur';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ds4outzra/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'r0xpswmo';

const MyProfile = ({ navigation, route }) => {
  const currentScreen = route.name;
  const { user, updateUser } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState(user);

  const showAlert = () => {
    Alert.alert('Information', 'Bientôt disponible');
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri; // Adjusting to correct the URI path
   
      uploadImage(uri);
    }
  };
  
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri; // Adjusting to correct the URI path
  
      uploadImage(uri);
    }
  };
  
  const uploadImage = async (uri) => {
    // Log the URI

  
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: 'image/jpeg', // Ensure the type is correct
      name: 'upload.jpg',
    });
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
    // Log FormData manually

    for (let [key, value] of formData._parts) {
   
    }
  
    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json', // Include Accept header
        },
      });
  
      // Log the response status
    
  
      const data = await response.json();
 
  
      if (response.ok) {
        const imageUrl = data.secure_url;
        setUpdatedUser({ ...updatedUser, profileImage: imageUrl });
        updateUser({ ...user, profileImage: imageUrl });
        Alert.alert('information','telechargement réussi !')
      } else {
        console.error('Error uploading image to Cloudinary:', data);
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);

    }
  };
   

  const handleProfilePicturePress = () => {
    Alert.alert(
      'Changer de photo de profil',
      'Choisissez une option',
      [
        {
          text: 'Prendre une photo',
          onPress: takePhoto,
        },
        {
          text: 'Choisir depuis la galerie',
          onPress: pickImage,
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon profil</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <TouchableOpacity
            style={styles.profilePicturePlaceholder}
            onPress={handleProfilePicturePress}
          >
            {updatedUser.profileImage ? (
              <Image source={{ uri: updatedUser.profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.profilePictureText}>{user.initials}</Text>
            )}
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.profileDate}>{user.dateOfBirth}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile')}>
            <MaterialIcons name="edit" size={24} color="#4A4A4A" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Menu</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={showAlert}>
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={showAlert}>
            <Text style={styles.menuText}>Inviter un(e) ami(e)</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>100</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Linking.openURL('https://edu-zen.com/')}
          >
            <Text style={styles.menuText}>À propos de EduZen</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Détails du compte</Text>
        <View style={styles.blurContainer}>
          <BlurView style={styles.blurView} intensity={100} tint="light">
            <View style={styles.accountDetailsInner}>
              <TouchableOpacity style={styles.accountItem} onPress={showAlert}>
                <Text style={styles.accountText}>Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accountItem} onPress={showAlert}>
                <Text style={styles.accountText}>Zed bot (AI)</Text>
                <View style={styles.premiumBadgeContainer}>
                  <Text style={styles.premiumBadgeText}>Premium</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accountItem} onPress={showAlert}>
                <Text style={styles.accountText}>Coaching</Text>
                <View style={styles.premiumBadgeContainer}>
                  <Text style={styles.premiumBadgeText}>Premium</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  profileContainer: {
    padding: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicturePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    fontSize: 24,
    color: '#4A4A4A',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  profileDate: {
    color: '#888',
  },
  editIcon: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  badge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
  },
  accountDetails: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    zIndex: 1, // Add zIndex to make sure it's on top
  },
  blurContainer: {
    position: 'relative', // Ensure proper positioning
    width: '100%',
    overflow: 'hidden', // Ensure content doesn't overflow
    marginBottom: 20,
  },
  blurView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'transparent', // Ensure blur effect is visible
  },
  accountDetailsInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    zIndex: 2, 
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accountText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  premiumBadgeContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  premiumBadgeText: {
    color: '#4A4A4A',
  },
});

export default MyProfile;
