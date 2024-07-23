import React, { useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";

const ScreenB = ({ navigation }) => {

  useEffect(() => {
    Alert.alert(
      "Information",
      "Ceci est juste une preuve de concept. Nous aimerions que vous testiez l'application et que vous nous donniez vos avis.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('ScreenE'),
        },
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Your content for ScreenB */}
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: width * 0.35,
    height: height * 0.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: "100%",
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#20AD96",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    color: "#20AD96",
    fontSize: width * 0.045,
  },
});

export default ScreenB;
