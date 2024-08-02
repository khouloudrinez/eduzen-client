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
    articlePoints: {},
    astucePoints: {},
    exercicePoints: {},
    pointsAdded: {}, // Track points added for each item
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

  const addPoints = (category, id, points = 0, message) => {
    console.log(`\nAdding points...\nCategory: ${category}\nItem ID: ${id}\nPoints to add: ${points}\nCurrent total points: ${user.points}`);

    setUser((prevUser) => {
      let newPoints = prevUser.points;
      const newArticlePoints = { ...prevUser.articlePoints };
      const newAstucePoints = { ...prevUser.astucePoints };
      const newExercicePoints = { ...prevUser.exercicePoints };
      const newPointsAdded = { ...prevUser.pointsAdded };

      if (category === 'Article') {
        if (!newArticlePoints[id]) {
          newArticlePoints[id] = 0;
        }
        const remainingPoints = 20 - newArticlePoints[id];
        const pointsToAdd = Math.min(points, remainingPoints);
        newPoints += pointsToAdd;
        newArticlePoints[id] += pointsToAdd;
        console.log(`Article points updated for ${id}: ${newArticlePoints[id]}`);
      }

      if (category === 'Astuce') {
        if (!newAstucePoints[id]) {
          newAstucePoints[id] = 0;
        }
        if (!newPointsAdded[id]) {
          newPointsAdded[id] = 0;
        }
        const pointsPerEntry = 10;
        const maxPoints = 30;
        const totalPointsEarned = Math.min(pointsPerEntry, maxPoints - newAstucePoints[id]);
        if (newAstucePoints[id] < maxPoints) {
          newPoints += totalPointsEarned;
          newAstucePoints[id] += totalPointsEarned;
          newPointsAdded[id] = newAstucePoints[id]; // Track points already added
          console.log(`Astuce points updated for ${id}: ${newAstucePoints[id]}`);
        }
      }

      if (category === 'Exercice') {
        if (!newExercicePoints[id]) {
          newExercicePoints[id] = 0;
        }
        const remainingPoints = 50 - newExercicePoints[id];
        const pointsToAdd = Math.min(points, remainingPoints);
        newPoints += pointsToAdd;
        newExercicePoints[id] += pointsToAdd;
        console.log(`Exercice points updated for ${id}: ${newExercicePoints[id]}`);
      }

      if (points > 0) {
        Alert.alert("Points Earned", message);
      }

      console.log(`New total points: ${newPoints}`);
      return { ...prevUser, points: newPoints, articlePoints: newArticlePoints, astucePoints: newAstucePoints, exercicePoints: newExercicePoints, pointsAdded: newPointsAdded };
    });
  };

  const addTask = (newTask) => {
    setUser((prevUser) => ({
      ...prevUser,
      tasks: [...prevUser.tasks, newTask],
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addPoints, addTask }}>
      {children}
    </UserContext.Provider>
  );
};
