import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { UserContext } from '../screens/UserContext';

const { width } = Dimensions.get('window');

const CardDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const { addPoints, user } = useContext(UserContext);
  const [startTime, setStartTime] = useState(Date.now());
  const videoRef = React.useRef(null);

  useEffect(() => {
    setStartTime(Date.now());
    console.log('Start time set for item:', item.id);
  }, [item]);

  const handleBackPress = () => {
    const duration = (Date.now() - startTime) / 1000; // in seconds
    console.log('Duration:', duration, 'for item:', item.id);

    if (item.category === 'Article') {
      if (duration >= 20 && !item.pointsEarned) { // Finished reading
        console.log('Article completed');
        addPoints('Article', item.id, 20, "Vous avez gagné 20 points pour avoir lu l'article en entier");
      } else if (duration >= 10 && !item.pointsEarned) { // Read half
        console.log('Article half completed');
        addPoints('Article', item.id, 10, "Vous avez gagné 10 points pour avoir lu la moitié de l'article");
      }
    }

    if (item.category === 'Astuces') {
      console.log('Astuce opened');
      if (!user.pointsAdded[item.id] || user.pointsAdded[item.id] < 30) {
        addPoints('Astuce', item.id, 10, "Vous avez gagné 10 points pour avoir ouvert l'astuce");
      }
    }

    navigation.goBack();
  };

  const handleVideoEnd = () => {
    if (item.category === 'Exercices' && !item.pointsEarned) {
      console.log('Exercise video ended');
      addPoints('Exercice', item.id, 50, "Vous avez gagné 50 points pour avoir regardé la vidéo en entier");
      item.pointsEarned = true; // Mark as earned
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.points}>Points: {item.points}</Text>
      {item.video ? (
        <Video
          ref={videoRef}
          source={item.video}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={styles.media}
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              handleVideoEnd();
            }
          }}
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
