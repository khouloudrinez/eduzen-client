import React, { createContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      removePastTasks();
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);
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
  const removePastTasks = () => {
    const currentTime = new Date();
    setUser((prevUser) => ({
      ...prevUser,
      tasks: prevUser.tasks.filter(task => {
        const taskDueDate = new Date(task.hour);
        return taskDueDate > new Date(currentTime.getTime() - 10 * 60000); // 10 minutes buffer
      }),
    }));
  };
  const addTask = (newTask) => {
    removePastTasks();
    
    setUser((prevUser) => {
      const updatedTasks = [...prevUser.tasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date));
      
      return {
        ...prevUser,
        tasks: updatedTasks,
      };
    });
  };
  return (
    <UserContext.Provider value={{ user, updateUser, addPoints,addTask }}>
      {children}
    </UserContext.Provider>
  );
};
