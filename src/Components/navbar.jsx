import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css"; // Import CSS cho Navbar

const Navbar = () => {
  const location = useLocation();

  const breadcrumbPaths = ["/", "/search", ""];

  if (!breadcrumbPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/create">Thêm bài viết</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
