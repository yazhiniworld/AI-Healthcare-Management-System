import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>🏥 Healthcare AI</h2>

        <ul>
  <li>
    <Link to="/">Dashboard</Link>
  </li>

  <li>
    <Link to="/patients">Patients</Link>
  </li>

  <li>
    <Link to="/doctors">Doctors</Link>
  </li>

  <li>
    <Link to="/appointments">Appointments</Link>
  </li>

  <li>
    <Link to="/reports">Reports</Link>
  </li>

  <li>
    <Link to="/assistant">AI Assistant</Link>
  </li>
</ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard Overview</h1>

        <div className="cards">

          <div className="card">
            <FaUserInjured size={35} />
            <h3>Total Patients</h3>
            <h2>{stats.totalPatients}</h2>
          </div>

          <div className="card">
            <FaUserMd size={35} />
            <h3>Total Doctors</h3>
            <h2>{stats.totalDoctors}</h2>
          </div>

          <div className="card">
            <FaCalendarCheck size={35} />
            <h3>Appointments</h3>
            <h2>{stats.totalAppointments}</h2>
          </div>

          <div className="card">
            <FaClock size={35} />
            <h3>Pending</h3>
            <h2>{stats.pendingAppointments}</h2>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;