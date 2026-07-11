import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaChevronRight,
  FaUserCircle,
} from "react-icons/fa";

import "./Navbar.css";

const routeTitles = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/patients": "Patients",
  "/doctors": "Doctors",
  "/appointments": "Appointments",
  "/reports": "Reports",
  "/assistant": "AI Assistant",
  "/users": "Users",
  "/patient-dashboard": "Patient Dashboard",
  "/doctor-dashboard": "Doctor Dashboard",
  "/my-profile": "My Profile",
};

export default function Navbar({ onMenuToggle }) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const pageTitle =
    routeTitles[location.pathname] || "Dashboard";

  const breadcrumbs =
    location.pathname === "/"
      ? []
      : location.pathname
          .split("/")
          .filter(Boolean);

  return (
    <header className="navbar">

      <button
        className="navbar-menu"
        onClick={() =>
          onMenuToggle && onMenuToggle()
        }
      >
        <FaBars />
      </button>

      <div className="navbar-main">

        <div className="navbar-page-title">
          {pageTitle}
        </div>

        <div className="navbar-breadcrumbs">
          <Link to="/">Home</Link>

          {breadcrumbs.map((crumb) => (
            <span
              key={crumb}
              className="breadcrumb-item"
            >
              <FaChevronRight className="breadcrumb-separator" />

              <span>
                {crumb
                  .replace("-", " ")
                  .replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )}
              </span>

            </span>
          ))}
        </div>

      </div>

      {user && (
        <div className="navbar-actions">

          <div className="user-profile">

            <div className="user-avatar">
              {user.username
                ? user.username.charAt(0).toUpperCase()
                : <FaUserCircle />}
            </div>

            <div className="user-info">
              <span className="user-name">
                {user.username}
              </span>

              <span className="user-badge">
                {user.role}
              </span>
            </div>

          </div>

        </div>
      )}

    </header>
  );
}