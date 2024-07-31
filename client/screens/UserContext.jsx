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

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
