import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/breadcrumb.css";

function Breadcrumb() {
  const location = useLocation();

  const breadcrumbPaths = ["/", "/posts","/search"];

  if (breadcrumbPaths.includes(location.pathname)) {
    return null;
  }

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="container">
      <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to}>
              {(value === "posts" ||value === "search")? (
                <Link to="/">{decodeURIComponent(value)}</Link>
              ) : (
                <Link to={to}>{decodeURIComponent(value)}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
