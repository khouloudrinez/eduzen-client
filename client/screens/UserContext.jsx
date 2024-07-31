import React, { createContext, useState } from 'react';
import { Alert } from "react-native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    initials: 'P',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    educationLevel: '',
    school: '',
    dateOfBirth: '',
    gender: '',
    tasks: [],
    points: 100,
    earnedPoints: {}
  });

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
      initials: `${newUserData.firstName[0]}${newUserData.lastName[0]}`,
    }));
  };

  const addPoints = (itemId, category, newPoints, message) => {
    setUser((prevUser) => {
      const updatedEarnedPoints = { ...prevUser.earnedPoints };
      const currentPoints = updatedEarnedPoints[itemId] || { Article: 0, Astuces: 0, Exercices: false };

      if (category === 'Article') {
        if (currentPoints.Article < 20) {
          const pointsToAdd = newPoints;
          updatedEarnedPoints[itemId] = { ...currentPoints, Article: Math.min(currentPoints.Article + pointsToAdd, 20) };
          return {
            ...prevUser,
            points: prevUser.points + (updatedEarnedPoints[itemId].Article - currentPoints.Article),
            earnedPoints: updatedEarnedPoints,
          };
        }
      } else if (category === 'Astuces') {
        const totalPoints = Math.min(currentPoints.Astuces + newPoints, 30);
        if (totalPoints > currentPoints.Astuces) {
          updatedEarnedPoints[itemId] = { ...currentPoints, Astuces: totalPoints };
          return {
            ...prevUser,
            points: prevUser.points + (totalPoints - currentPoints.Astuces),
            earnedPoints: updatedEarnedPoints,
          };
        }
      } else if (category === 'Exercices') {
        if (!currentPoints.Exercices) {
          updatedEarnedPoints[itemId] = { ...currentPoints, Exercices: true };
          return {
            ...prevUser,
            points: prevUser.points + newPoints,
            earnedPoints: updatedEarnedPoints,
          };
        }
      }
      return prevUser;
    });
    Alert.alert("Félicitations", message);
  };
  const addTask = (newTask) => {
    setUser((prevUser) => ({
      ...prevUser,
      tasks: [...prevUser.tasks, newTask],
    }));
  };
  return (
    <UserContext.Provider value={{ user, updateUser, addPoints,addTask }}>
      {children}
    </UserContext.Provider>
  );
};
