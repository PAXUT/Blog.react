import React, { useState, useEffect } from "react";
import "../css/notification.css";

const Notification = ({ message, type, duration }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, duration || 3000); // Ẩn thông báo sau 3 giây (hoặc duration nếu được cung cấp)

      return () => clearTimeout(timer); // Xóa timer khi component unmount
    }
  }, [message, duration]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <i className="bi bi-check-circle icon"></i>;
      case "error":
        return <i className="bi bi-x-circle icon"></i>;
      case "warning":
        return <i className="bi bi-exclamation-circle icon"></i>;
      case "info":
        return <i></i>;
      default:
        return null;
    }
  };

  const notificationClasses = `notification ${type || "info"} ${
    showNotification ? "show" : ""
  }`;

  return (
    showNotification && (
      <div className={notificationClasses}>
        {getIcon(type)}
        <span>{message}</span>
      </div>
    )
  );
};

export default Notification;
