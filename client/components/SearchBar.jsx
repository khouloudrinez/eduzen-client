import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity, Modal } from "react-native";
import { UserContext } from "../screens/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const { user } = useContext(UserContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    const results = user.tasks.filter(task =>
      task.nameOfTask.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(results);
    onSearch(query);
    console.log(query);
  };
  const extractTime = (dateString) => {
    return moment(dateString).format('HH:mm');
  };
  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as MM/DD/YYYY
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
        
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.nameOfTask}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskPress(item)}>
            <View style={styles.taskItem}>
              <Text>{item.nameOfTask}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTask.categorieOf}</Text>

              <Text style={styles.modalTitle}>{selectedTask.typeOf}  :  {selectedTask.nameOfTask}</Text>
            <Text style={styles.modalTitle}>{extractTime(selectedTask.hour)}   {formatDate(selectedTask.date)}</Text>

              <Text>{selectedTask.details}</Text>
         
              <LinearGradient
                colors={['#3A98F5', '#00E9B8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.closeButtonContainer}
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </Modal>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButtonContainer: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButton: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchBar;
