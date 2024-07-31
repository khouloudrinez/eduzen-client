import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { UserContext } from '../screens/UserContext';

const { width } = Dimensions.get('window');

const CardDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const { addPoints } = useContext(UserContext);
  const [startTime, setStartTime] = useState(Date.now());
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Reset the timer on mount to ensure accurate reading time
    setStartTime(Date.now());
  }, [item]);

  const handleBackPress = () => {
    const duration = (Date.now() - startTime) / 1000; // in seconds

    if (item.category === 'Article') {
      if (duration >= 20 && !item.pointsEarned) { // Finished reading
        addPoints(item.id, 'Article', 20, "Vous avez gagné 20 points pour avoir lu l'article en entier");
        item.pointsEarned = true; // Mark as earned
      } else if (duration >= 10 && !item.pointsEarned) { // Read half
        addPoints(item.id, 'Article', 10, "Vous avez gagné 10 points pour avoir lu la moitié de l'article");
        item.pointsEarned = true; // Mark as earned
      }
    } else if (item.category === 'Astuces') {
      if (viewCount < 3) {
        addPoints(item.id, 'Astuces', 10, `Vous avez gagné 10 points (total ${10 * (viewCount + 1)}/30)`);
        setViewCount(viewCount + 1);
        if (viewCount + 1 >= 3) {
          item.pointsEarned = true; // Mark as earned
        }
      }
    } else if (item.category === 'Exercices') {
      if (!item.pointsEarned) {
        // Check if the video is finished
        addPoints(item.id, 'Exercices', 50, "Vous avez gagné 50 points pour avoir regardé la vidéo en entier");
        item.pointsEarned = true; // Mark as earned
      }
    }

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.points}>Points: {item.points}</Text>
      {item.video ? (
        <Video
          source={item.video}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.media}
          useNativeControls
        />
      ) : (
        <Image source={item.image} style={styles.media} />
      )}
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
      >
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  media: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333333',
  },
  category: {
    fontSize: 18,
    color: '#666666',
    marginVertical: 5,
  },
  points: {
    fontSize: 18,
    color: '#20AD96',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
    paddingBottom: 200,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CardDetails;
