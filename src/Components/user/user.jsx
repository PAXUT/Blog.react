import React from "react";
import { useState, useEffect, useContext } from "react";
import "../../css/user.css";
import { UserContext } from "../user/apiuser";
import axios from "axios";
import { useNotification } from "../NotificationContext";
import { Link } from "react-router-dom";
import Back from "../back";

const User = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [name, setName] = useState(userData.name);
  const [showChageName, setShowChageName] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    setName(userData.name); // Cập nhật state name khi userData thay đổi
  }, [userData]);

  const handleSaveName = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/chagename",
        {
          name: name,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.code === 200) {
        setUserData(response.data.data);
        setShowChageName(false);
        showNotification("Thay đổi thông tin thành công!", "success");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật tên người dùng:", error);
    }
  };

  const handleShowChageName = () => {
    setShowChageName(!showChageName);
  };

  return (
    <div>
      <div className="add-form-container">
        <Back />
        <h2>Thông tin tài khoản</h2>
        {userData ? (
          <div>
            <div className="name">
              <label htmlFor="name">Tên người dùng</label>
              <input
                id="name"
                className="input-name"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
                disabled
              />
              <div className="showChageName" onClick={handleShowChageName}>
                {showChageName ? (<i className="bi bi-x iconv"></i>) : "Đổi tên"}
              </div>
            </div>
            {showChageName ? (
              <div className="name hidden">
                <label htmlFor="chagename">Nhập tên người dùng mới</label>
                <input
                  id="chagename"
                  className="input-name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <div className="showChageName" onClick={handleSaveName}>
                  <i className="bi bi-check2 iconv"></i>
                </div>
              </div>
            ) : null}
            <div>
              <label htmlFor="username">Tên tài khoản</label>
              <input
                id="username"
                type="text"
                value={userData.email}
                required
                disabled
              />
            </div>
            <button type="submit" >
              <Link to={`/user/password`} style={{ textDecoration:"none",color:"#ffffff" }}>Đổi mật khẩu</Link>
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default User;
