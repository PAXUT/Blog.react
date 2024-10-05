import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UserContext } from "./user/apiuser";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const { userData } = useContext(UserContext);
  //logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout không thành công:", response.data);
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi khi logout:", error);
    }
  };
  //search
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`); // Chuyển hướng đến trang kết quả tìm kiếm
  };
  //dropdown
  const handleSeeMore = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOptionClose = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    //hàm đóng dropdown khi click ra bên ngoai
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".btn-user") &&
        !e.target.closest(".options-list")
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  return (
    <nav className="nav-container">
      <div className="div-container">
        <div className="btn">
          <NavLink to="/" style={{ textDecoration:'none',color:"#36ce57" }}><h1>My Blogs</h1></NavLink>

          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="bi bi-house"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link">
                Add New Blog
              </NavLink>
            </li>
          </ul>

          {userData ? <p>{userData.name}</p> : <p>Loading user data...</p>}
          <button className="btn-user" onClick={handleSeeMore}>
            <i className="bi bi-person"></i>
          </button>

          {showOptions ? (
            <ul className="options-list">
              <li>
                <div className="option-select" onClick={handleClickOptionClose}>
                  <NavLink to="/user">
                    <i className="bi bi-box-arrow-right "></i> Thông tin tài
                    khoản
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="option-select" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right "></i> Đăng xuất
                </div>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
