import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Tạo context
export const UserContext = createContext();

// Provider component để cung cấp dữ liệu cho toàn bộ ứng dụng
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUserData(response.data);
      } catch {
        console.log("Lỗi khi lấy thông tin người dùng:");
      }
    };

    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
