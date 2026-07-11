import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import authService from "../services/authService";
import "./Verification.css";

export default function Verification() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "DOCTOR") {
      navigate("/app");
    } else if (user.approved) {
      navigate("/app/doctor-dashboard");
    }
  }, [navigate, user]);

  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="verification-page">
      <div className="verification-card glass-card">
        <FaCheckCircle className="verification-icon" />
        <h1>Verification pending</h1>
        <p>
          Your doctor account has been created successfully and is currently awaiting admin approval.
          You will receive access as soon as the verification completes.
        </p>
        <button className="primary-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
