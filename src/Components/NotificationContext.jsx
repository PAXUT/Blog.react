import React, { createContext, useState, useContext } from "react";
import Notification from "./notification";
import { v4 as uuidv4 } from "uuid";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    const id = uuidv4();
    setNotification({ id, message, type });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
