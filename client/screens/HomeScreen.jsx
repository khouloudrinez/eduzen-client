import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bubble from "./Bubble";

const HomeScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const { user } = useContext(UserContext);

  const [events, setEvents] = useState(user.tasks);
  const [todaysDate, setTodaysDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.user) {
        const { firstName, lastName } = route.params.user;
        setInitials(`${firstName[0]}${lastName[0]}`);
        setUserName(`${firstName} ${lastName}`);
        setEvents(user.tasks);
      }
    }, [route.params?.user])
  );
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    setTodaysDate(formattedDate);
  }, []);

  useEffect(() => {
    const showWelcomePopup = async () => {
      try {
        const hasShownPopup = await AsyncStorage.getItem("popupShown");
        // Check value
        if (hasShownPopup === null) {
          setPopupShown(true);
          await AsyncStorage.setItem("popupShown", "true");
          // await AsyncStorage.clear()
        } else {
          setPopupShown(false); // Ensure it's hidden if already shown
        }
      } catch (error) {
        console.error("Failed to check popup status", error);
      }
    };

    showWelcomePopup();
  }, []);

  const handleCloseBubble = () => {
    setPopupShown(false);
  };

  const renderEvent = ({ item }) => {
    const eventTime = new Date(item.hour);
    const hours = eventTime.getHours();
    const minutes = eventTime.getMinutes().toString().padStart(2, "0");
    return (
      <Text style={styles.timeSlot}>
        {`${hours}:${minutes} - ${item.nameOfTask}`}
      </Text>
    );
  };
  const extractTime = (dateString) => {
    return moment(dateString).format("HH:mm");
  };
  const articles = [
    {
      title: "Comment faire le bon choix pour son futur métier",
      image: {
        uri: "https://www.sciforma.com/wp-content/uploads/2022/03/Screen-Shot-2022-06-01-at-4.28.51-PM-1024x578.png",
      },
      points: 50,
    },
    {
      title: "Conseils pour un mode de vie sain",
      image: {
        uri: "https://www.yarooms.com/hubfs/1-Sep-15-2023-02-45-09-1809-PM.png",
      },
      points: 50,
    },
    {
      title: "Bien-être mental: Techniques et astuces",
      image: {
        uri: "https://www.avocor.com/wp-content/uploads/2018/09/7-examples-of-teamwork-collaboration-in-the-workplace-featured-image.png",
      },
      points: 50,
    },
  ];

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const getEventForTimeSlot = (timeSlot) => {
    const [hours] = timeSlot.split(":");

    // Get today's date
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // Get date part in YYYY-MM-DD format

    let events = user.tasks;

    // Filter tasks to include only today's tasks
    const todaysTasks = events.filter((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === todayDateString;
    });

    // Find the event for the specific time slot
    return todaysTasks.find((event) => {
      const eventTime = new Date(event.hour);

      return eventTime.getHours() === parseInt(hours);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.header1}>
          <Text style={styles.headerTitle1}>Aujourd'hui</Text>
          <View style={styles.header}>
            <LinearGradient
              colors={["#3A98F5", "#00E9B8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pointsContainer}
            >
              <Text style={styles.points}>{user.points}</Text>
            </LinearGradient>

            {popupShown && (
              <Bubble
                message="Félicitations! Tu as gagné 100 points de bienvenue!"
                onClose={handleCloseBubble}
              />
            )}
            <TouchableOpacity
              style={styles.idContainer}
              onPress={() => navigation.navigate("MyProfile")}
            >
              {console.log(user)}
              {user.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profilete}>
                  <Text style={styles.profilePictureText}>{user.initials}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.greeting}>
            Bonjour, {`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
          </Text>
          <View style={styles.timeSlots}>
            {timeSlots.map((timeSlot, index) => {
              const event = getEventForTimeSlot(timeSlot);
              return (
                <View key={index} style={styles.timeSlot}>
                  <Text style={styles.time}>{timeSlot}</Text>
                  {event ? (
                    <Text style={styles.event}>{event.nameOfTask}</Text>
                  ) : (
                    <Text style={styles.noEvent}></Text>
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.row}>
            <Text style={styles.date}>{todaysDate}</Text>
            <TouchableOpacity style={styles.openButton}>
              <Text
                onPress={() => setModalVisible(true)}
                style={styles.openButtonText}
              >
                Ouvrir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Evénements pour le {todaysDate}
              </Text>
              {user.tasks.length > 0 ? (
                <FlatList
                  data={user.tasks}
                  renderItem={renderEvent}
                  keyExtractor={(item, index) =>
                    item._id?.toString() ?? `fallback-${index}`
                  }
                  contentContainerStyle={styles.listContainer}
                />
              ) : (
                <Text style={styles.noEventText}>
                  Pas d'activités prévus pour aujourd'hui
                </Text>
              )}

              <LinearGradient
                colors={["#3A98F5", "#00E9B8"]}
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
        {user.tasks.length === 0 ? (
          <TouchableOpacity onPress={() => navigation.navigate("Add")}>
            <View style={styles.nextTask}>
              <View style={styles.taskHeader}>
                <Text style={styles.nextTaskTitle}>Prochaine tâche</Text>
                <Text style={styles.nextTaskTime}></Text>
              </View>
              <Text style={styles.nextTaskActivity}>Choisir une activité</Text>
              <Text style={styles.nextTaskDescription}>
                Ajoute tes tâches et prends le contrôle de ton temps
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.nextTask}>
            <View style={styles.taskHeader}>
              <Text style={styles.nextTaskTitle}>Prochaine tâche pour le </Text>

              <Text style={styles.nextTaskTitle}>
                {user.tasks[0].date.toISOString().split("T")[0]} à{" "}
                {extractTime(user.tasks[0].hour)}
              </Text>
            </View>

            <Text style={styles.nextTaskActivity}>
              {user.tasks[0].typeOf} : {user.tasks[0].nameOfTask}
            </Text>
          </View>
        )}
        <View style={styles.container1}>
          <View style={styles.objectives}>
            <MaterialIcons
              name="chevron-left"
              size={24}
              color="white"
              style={styles.arrowIcon}
            />
            <View style={styles.content1}>
              <Text style={styles.objectivesTitle}>Mes objectifs</Text>
              <Text style={styles.objectiveSubtitle}>
                Es-tu prêt(e) à relever de nouveaux défis et à atteindre tes
                objectifs ?
              </Text>
              <Text style={styles.objectivesDescription}>-</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="white"
              style={styles.arrowIcon}
            />
          </View>
        </View>
        <View style={styles.schedule}>
          <Image
            source={require("../assets/home/user.png")}
            style={styles.scheduleIcon}
          />
          <View>
            <Text style={styles.scheduleTitle}>Votre emploi du temps</Text>
            <Text style={styles.scheduleDescription}>
              Quelle votre prochaine étape
            </Text>
          </View>
        </View>
        <View style={styles.wellbeing}>
          <Text style={styles.wellbeingTitle}>Votre espace bien-être</Text>
          <Text style={styles.wellbeingDescription}>
            Collecte des points ZEN en apprenant à gérer ton temps efficacement
            et en faisant des exercices pour augmenter ta concentration.
          </Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.articles}>
            {articles.map((article, index) => (
              <View key={index} style={styles.article}>
                <Image source={article.image} style={styles.articleImage} />
                <Text style={styles.articlePoints}>+ {article.points}</Text>
                <View style={styles.articleOverlay}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <LinearGradient
            colors={["#3A98F5", "#00E9B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardContainerGradient}
          >
            <Image
              source={require("../assets/home/EduZen Zed 01.png")}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <View style={styles.textContent}>
                <Text style={styles.cardTitle}>
                  Soyez le premier à tester Zedbot
                </Text>
                <Text style={styles.cardText}>
                  Bonjour ! Je suis Zedbot, votre compagnon IA pour le bien-être
                  mental. Considérez-moi comme un assistant confidentiel, à
                  l'écoute et offrant un soutien dans un espace sûr et sécurisé.
                </Text>
              </View>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Discuter avec Zed</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mainContent: {
    padding: 20,
    marginBottom: 60, // Adjust based on BottomNavBar height
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profilePictureText: {
    fontSize: 24,
    color: "#4A4A4A",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsContainer: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  pointsText: {
    fontSize: 18,
    color: "#00C853",
    marginRight: 10,
  },
  idContainer: {
    // backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  idText: {
    fontSize: 16,
    color: "#757575",
  },
  content: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  profilete: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  timeSlots: {
    flex: 1,
    marginBottom: 20,
  },
  timeSlot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  time: {
    fontSize: 16,
    color: "gray",
  },
  event: {
    fontSize: 16,
    color: "#000",
  },
  noEvent: {
    fontSize: 16,
    color: "#AAA",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  openButton: {
    padding: 10,
    backgroundColor: "#3F3A64",
    borderRadius: 10,
  },
  openButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#3F3A64",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    width: "100%",
  },
  noEventText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  closeButtonContainer: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButton: {
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextTask: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextTaskTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  nextTaskTime: {
    fontSize: 14,
    color: "#20AD96",
  },
  nextTaskActivity: {
    fontSize: 13,
    color: "grey",
    marginTop: 10,
  },
  nextTaskDescription: {
    fontSize: 15,
    marginTop: 5,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  objectives: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 10, // Reduced padding for smaller card
    borderRadius: 10,
    marginBottom: 20,
    width: "100%", // Adjust width as needed
    justifyContent: "space-between", // Align arrows at the ends
  },
  content1: {
    alignItems: "center",
  },
  objectivesTitle: {
    fontSize: 14,
    color: "#20AD96",
    marginBottom: 5, // Reduced margin
  },
  objectiveSubtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5, // Reduced margin
  },
  objectivesDescription: {
    fontSize: 14,
    color: "#20AD96",
  },
  arrowIcon: {},
  schedule: {
    backgroundColor: "#E0F7FA",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scheduleDescription: {
    fontSize: 13,
  },
  wellbeing: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  wellbeingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wellbeingDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: "grey",
  },
  articles: {
    flexDirection: "row",
    paddingHorizontal: 0, // Remove padding
  },
  article: {
    width: 250,
    height: 200, // Adjust height as needed
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  articleImage: {
    width: "150%",
    height: "100%",
  },
  articleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(192,192,192,0.4)",
    padding: 5,
  },
  articlePoints: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    color: "#20AD96",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  cardImage: {
    top: 18,
    width: width * 0.19,
    height: height * 0.12,
    marginRight: 30,
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#3F3A64",
    marginBottom: 20,
  },
  cardButton: {
    left: -45,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
    width: width * 0.7,
  },
  cardContainerGradient: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    marginBottom: 70,
  },
  cardButtonText: {
    color: "#3A98F5",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },

  rewardsContainer: {
    padding: 30,
    borderRadius: 10,
    marginBottom: 40,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rewards: {
    flexDirection: "row",
  },
  rewardCard: {
    width: width * 0.7,
    backgroundColor: "#F5F1ED",
    padding: 20,
    borderRadius: 10,
    marginRight: 20,
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20AD96",
    marginBottom: 5,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3F3A64",
  },
  rewardPartner: {
    fontSize: 14,
    color: "#757575",
  },
});

export default HomeScreen;
