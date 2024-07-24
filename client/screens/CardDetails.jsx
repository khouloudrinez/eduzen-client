import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const CardDetails = ({ route }) => {
  const { title, image, video, points, category, description } = route.params.item;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.points}>Points: {points}</Text>
      {video ? (
        <Video
          source={video}
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
        <Image source={image} style={styles.media} />
      )}
      <Text style={styles.description}>{description}</Text>
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
});

export default CardDetails;
