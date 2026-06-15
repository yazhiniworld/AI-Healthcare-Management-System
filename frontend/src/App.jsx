import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/login" element={localStorage.getItem('user') ? <Navigate to="/" /> : <Login />} />

				<Route
					path="/"
					element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
				/>

				<Route
					path="/patients"
					element={<ProtectedRoute><Patients /></ProtectedRoute>}
				/>

				<Route
					path="/doctors"
					element={<ProtectedRoute><Doctors /></ProtectedRoute>}
				/>

				<Route
					path="/appointments"
					element={<ProtectedRoute><Appointments /></ProtectedRoute>}
				/>

				<Route
					path="/reports"
					element={<ProtectedRoute><Reports /></ProtectedRoute>}
				/>

				<Route
					path="/assistant"
					element={<ProtectedRoute><AIAssistant /></ProtectedRoute>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
