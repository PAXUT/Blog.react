import React, { useState } from "react";
import axios from "axios";
import "../../css/editPassword.css";
import Back from "../back";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/password",
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSuccess(response.data.message);
      setError(null);
    } catch (error) {
      setSuccess(null);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
    <div className="change-password-container">
    <Back />
      <h1>Đổi mật khẩu</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
          <input
            type="password"
            id="currentPassword"
            className="password-input"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới:</label>
          <input
            type="password"
            id="newPassword"
            className="password-input"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
          <input
            type="password"
            id="confirmPassword"
            className="password-input"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="submit-button"> 
          Đổi mật khẩu
        </button>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
