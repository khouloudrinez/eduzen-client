// UserContext.js
import React, { createContext, useState } from 'react';

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
  });

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
      initials: `${newUserData.firstName[0]}${newUserData.lastName[0]}`,
    }));
  };
  const addTask = (newTask) => {
    setUser((prevUser) => ({
      ...prevUser,
      tasks: [...prevUser.tasks, newTask],
    }));
  };

  const updateTask = (taskIndex, updatedTask) => {
    setUser((prevUser) => {
      const updatedTasks = prevUser.tasks.map((task, index) =>
        index === taskIndex ? { ...task, ...updatedTask } : task
      );
      return {
        ...prevUser,
        tasks: updatedTasks,
      };
    });
  };
  return (
    <UserContext.Provider value={{ user, updateUser, addTask, updateTask }}>
      {children}
    </UserContext.Provider>
  );
};
