import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/sanctum/csrf-cookie"
        );
        setCsrfToken(response.headers["x-csrf-token"]);
      } catch (error) {
        console.log("Lỗi khi lấy CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        console.log(response.data.data);
      } else {
        setError("Đăng nhập thất bại, sai email hoặc mật khẩu.");
      }
    } catch (error) {
      setError(error.response.data.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="form-container login-form">
      <h2>Đăng nhập</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-submit">
          <button type="submit">Đăng nhập</button>
        </div>
      </form>
      <p>
        Nếu chưa có tài khoản, vui lòng đăng ký
        <Link to="/register"> tại đây.</Link>
      </p>
    </div>
  );
}

export default Login;
