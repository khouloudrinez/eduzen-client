import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Switch } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from './UserContext';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons

const Detail = ({ route, navigation }) => {
  const { section, item} = route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [name, setName] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const { user, addTask, updateTask } = useContext(UserContext);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };


  
      const handleAddTask = () => {
        const newTask = {
          nameOfTask:name,
          typeOf: item.text,
          categorieOf: section,
          date: date,
          hour: time,
        };
        addTask(newTask);
        Alert.alert('Success', 'Élément ajouté au calendrier');
        navigation.navigate('Home');
      };

      

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail</Text>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="Ajouter un titre"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Section: {section}</Text>
        <Text style={styles.infoText}>Catégorie: {item.text}</Text>
       
      </View>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.labelText}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
          <Text style={styles.dateTimeText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.labelText}>Heure</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeButton}>
          <Text style={styles.dateTimeText}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>Toute la journée</Text>
        <Switch
          value={isAllDay}
          onValueChange={setIsAllDay}
        />
      </View>
      <TouchableOpacity onPress={handleAddTask} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Enregistrer</Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: "#fafafa",
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  labelText: {
    fontSize: 16,
    color: "#333",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateTimeButton: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fafafa",
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeText: {
    fontSize: 16,
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#3A98F5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detail;
