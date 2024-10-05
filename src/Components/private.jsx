import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./nav";
import Breadcrumb from "./breadcrumb";
import Navbar from "./navbar";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? (
    <>
      <Nav />
      <Breadcrumb />
      <Navbar/>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
