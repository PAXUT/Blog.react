import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/auth.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="form-container">
      <h2>Đăng ký</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-submit">
          <button type="submit">Đăng ký</button>
        </div>
      </form>
      <p>
        Nếu bạn đã có tài khoản, vui lòng đăng nhập{" "}
        <Link to="/login">tại đây.</Link>
      </p>
    </div>
  );
}

export default Register;
