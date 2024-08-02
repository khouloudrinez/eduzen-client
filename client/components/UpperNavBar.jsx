import React, { useContext , useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { API_URL } from "@env";
import arrowBackIcon from '../assets/home/arrow-back.png';
import { UserContext } from "../screens/UserContext";

const UpperNavBar = ({ navigation, currentScreen }) => {

    const { user } = useContext(UserContext);
    
       


    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={arrowBackIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.screenName}>{currentScreen}</Text>
            </View>
            
            <View style={styles.header}>
                <LinearGradient
                    colors={['#3A98F5', '#00E9B8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.pointsContainer}
                >
                    <Text style={styles.points}>{user.points}</Text>
                </LinearGradient>

                
                    <TouchableOpacity
                        style={styles.profileContainer}
                        onPress={() => navigation.navigate('MyProfile')}
                    >
                      
                    {user.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            ) : (
                <View style={styles.profilete}>
              <Text style={styles.profileText}>{user.initials}</Text>
            
              </View>
            )} 
                    </TouchableOpacity>
               
               
            </View>
        </View>
    );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        height: 60,
        position: 'absolute',
        left: 0,
        right: 0,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 30,
      },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    screenName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsContainer: {
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    points: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profilete:{
        backgroundColor: "#E0E0E0",
        borderRadius: 20,
width:40,
height:40,
alignItems:'center',
justifyContent:'center'
    },
    profileContainer: {
        // backgroundColor: "#E0E0E0",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight:15,
    
    },
    profileText: {
        fontSize: 16,
        color: "#757575",
    },
});

export default UpperNavBar;
