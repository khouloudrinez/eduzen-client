import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Bubble = ({ message, onClose }) => {
  return (
    <View style={styles.bubble}>
    <Text style={styles.bubbleText}>{message}</Text>
    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
      <Text style={styles.closeButtonText}>x</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ffddc1',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    zIndex: 1000, // Ensure it’s on top
  },
  bubbleText: {
    fontSize: 12,
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});


export default Bubble;
