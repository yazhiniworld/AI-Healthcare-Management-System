import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaChartBar,
  FaRobot,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import authService from "../services/authService";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <aside className={`sidebar-panel ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div>
          <p className="brand">HealthPlus</p>
          <span className="brand-sub">Hospital Suite</span>
        </div>

        <button className="close-icon" onClick={onClose}>
          <FaBars />
        </button>
      </div>

      <div className="sidebar-user-card glass-card">
        <div className="user-avatar">
          {user?.username?.charAt(0).toUpperCase() || "H"}
        </div>

        <div>
          <p className="user-name">{user?.username || "Guest"}</p>
          <p className="user-role">{user?.role || "ROLE"}</p>
        </div>
      </div>

      <nav className="sidebar-nav">

        {/* Dashboard */}
        <NavLink
          to={
            user?.role === "ADMIN"
              ? "/dashboard"
              : user?.role === "DOCTOR"
              ? "/doctor-dashboard"
              : "/patient-dashboard"
          }
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FaHome /> Dashboard
        </NavLink>

        {/* ================= ADMIN ================= */}
        {user?.role === "ADMIN" && (
          <>
            <NavLink
              to="/patients"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaUserInjured /> Patients
            </NavLink>

            <NavLink
              to="/doctors"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaUserMd /> Doctors
            </NavLink>

            <NavLink
              to="/appointments"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaCalendarAlt /> Appointments
            </NavLink>

            <NavLink
              to="/reports"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaChartBar /> Reports
            </NavLink>

            <NavLink
              to="/assistant"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaRobot /> AI Assistant
            </NavLink>

            <NavLink
              to="/users"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaUsers /> Users
            </NavLink>
          </>
        )}

        {/* ================= DOCTOR ================= */}
        {/* ================= DOCTOR ================= */}
{user?.role === "DOCTOR" && (
  <>
    <NavLink
      to="/doctor-profile"
      onClick={onClose}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaUserMd /> My Profile
    </NavLink>

    <NavLink
      to="/appointments"
      onClick={onClose}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaCalendarAlt /> Appointments
    </NavLink>

    <NavLink
      to="/reports"
      onClick={onClose}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaChartBar /> Reports
    </NavLink>

    <NavLink
      to="/assistant"
      onClick={onClose}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaRobot /> AI Assistant
    </NavLink>
  </>
)}
        {/* ================= PATIENT ================= */}
        {user?.role === "PATIENT" && (
          <>
            <NavLink
              to="/my-profile"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaUserInjured /> My Profile
            </NavLink>

            <NavLink
              to="/appointments"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaCalendarAlt /> Appointments
            </NavLink>

            <NavLink
              to="/reports"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaChartBar /> Reports
            </NavLink>

            <NavLink
              to="/assistant"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaRobot /> AI Assistant
            </NavLink>
          </>
        )}

      </nav>

      <button
        className="logout-btn"
        onClick={() => {
          authService.logout();
          window.location.href = "/login";
        }}
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}