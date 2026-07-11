import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import AIAssistant from "./pages/AIAssistant";
import Users from "./pages/Users";
import MyProfile from "./pages/MyProfile";
import DoctorProfile from "./pages/DoctorProfile";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Verification from "./pages/Verification";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

  function AppShell({ children, hideNavbar = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
      {!hideNavbar && (
      <Navbar
        onMenuToggle={() =>
          setSidebarOpen((prev) => !prev)
        }
      />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className={`app-overlay ${
          sidebarOpen ? "visible" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className="app-content"
        onClick={() =>
          sidebarOpen && setSidebarOpen(false)
        }
      >
        <div className="page-layout">
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={
            user ? (
              <Navigate
                to={
                  user.role === "DOCTOR"
                    ? "/doctor-dashboard"
                    : user.role === "PATIENT"
                    ? "/patient-dashboard"
                    : "/dashboard"
                }
              />
            ) : (
              <Landing />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />

        {/* ADMIN */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            user?.role === "ADMIN" ? (
              <ProtectedRoute>
                <AppShell>
                  <Patients />
                </AppShell>
              </ProtectedRoute>
            ) : (
              <Navigate
                to={
    user?.role === "ADMIN"
      ? "/dashboard"
      : user?.role === "DOCTOR"
      ? "/doctor-dashboard"
      : "/patient-dashboard"
  }
              />
            )
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <AppShell>
                <Doctors />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppShell>
                <Appointments />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <AppShell>
                <Reports />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <AppShell>
                <AIAssistant />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            user?.role === "ADMIN" ? (
              <ProtectedRoute>
                <AppShell>
                  <Users />
                </AppShell>
              </ProtectedRoute>
            ) : (
              <Navigate
                to={
                  user?.role === "PATIENT"
                    ? "/patient-dashboard"
                    : "/doctor-dashboard"
                }
              />
            )
          }
        />

        {/* DOCTOR */}

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <DoctorDashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />

        {/* PATIENT */}

        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <PatientDashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
  path="/my-profile"
  element={
    <ProtectedRoute>
      <AppShell  hideNavbar={true}>
        {user?.role === "DOCTOR" ? (
          <DoctorProfile />
        ) : (
        <MyProfile />
        )}
      </AppShell>
    </ProtectedRoute>
  }
/>
<Route
  path="/doctor-profile"
  element={
    <ProtectedRoute>
      <AppShell>
        <DoctorProfile />
      </AppShell>
    </ProtectedRoute>
  }
/>
        

        <Route
          path="/verification"
          element={
            <ProtectedRoute>
              <AppShell>
                <Verification />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;