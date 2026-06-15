import { useEffect, useState } from "react";
import {
FaCalendarCheck,
FaUser,
FaUserMd,
FaClock
} from "react-icons/fa";

import {
getAllAppointments,
confirmAppointment,
completeAppointment,
cancelAppointment
} from "../services/appointmentService";

import "./Appointments.css";

function Appointments() {

const [appointments, setAppointments] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
loadAppointments();
}, []);

const loadAppointments = async () => {
try {
const data = await getAllAppointments();
setAppointments(data);
} catch (error) {
console.error(error);
}
};

const handleConfirm = async (id) => {
try {
await confirmAppointment(id);
loadAppointments();
} catch (error) {
console.error(error);
}
};

const handleComplete = async (id) => {
try {
await completeAppointment(id);
loadAppointments();
} catch (error) {
console.error(error);
}
};

const handleCancel = async (id) => {
try {
await cancelAppointment(id);
loadAppointments();
} catch (error) {
console.error(error);
}
};

const filteredAppointments = appointments.filter(
(appointment) =>
appointment.patient?.patientName
?.toLowerCase()
.includes(searchTerm.toLowerCase()) ||
appointment.doctor?.doctorName
?.toLowerCase()
.includes(searchTerm.toLowerCase())
);

const pendingCount = appointments.filter(
(a) => a.status === "PENDING"
).length;

const confirmedCount = appointments.filter(
(a) => a.status === "CONFIRMED"
).length;

const completedCount = appointments.filter(
(a) => a.status === "COMPLETED"
).length;

return ( <div className="appointments-page">
  
  <div className="appointments-header">
    <h1>Appointments Management</h1>
    <p>Manage patient appointments and schedules</p>
  </div>

  <div className="appointments-stats">

    <div className="appointment-stat-card">
      <h2>{appointments.length}</h2>
      <p>Total Appointments</p>
    </div>

    <div className="appointment-stat-card">
      <h2>{pendingCount}</h2>
      <p>Pending</p>
    </div>

    <div className="appointment-stat-card">
      <h2>{confirmedCount}</h2>
      <p>Confirmed</p>
    </div>

    <div className="appointment-stat-card">
      <h2>{completedCount}</h2>
      <p>Completed</p>
    </div>

  </div>

  <input
    className="appointment-search"
    type="text"
    placeholder="Search patient or doctor..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <div className="appointments-grid">

    {filteredAppointments.map((appointment) => (

      <div
        className="appointment-card"
        key={appointment.appointmentId}
      >

        <div
          className={`status-badge ${appointment.status?.toLowerCase()}`}
        >
          {appointment.status || "PENDING"}
        </div>

        <h3>
          <FaUser />
          {" "}
          {appointment.patient?.patientName}
        </h3>

        <p>
          <FaUserMd />
          {" "}
          {appointment.doctor?.doctorName}
        </p>

        <p>
          {appointment.doctor?.specialization}
        </p>

        <p>
          <FaCalendarCheck />
          {" "}
          {appointment.appointmentDate}
        </p>

        <p>
          <FaClock />
          {" "}
          {appointment.appointmentTime}
        </p>

        <div className="appointment-actions">

          <button
            className="confirm-btn"
            onClick={() =>
              handleConfirm(
                appointment.appointmentId
              )
            }
          >
            Confirm
          </button>

          <button
            className="complete-btn"
            onClick={() =>
              handleComplete(
                appointment.appointmentId
              )
            }
          >
            Complete
          </button>

          <button
            className="cancel-btn"
            onClick={() =>
              handleCancel(
                appointment.appointmentId
              )
            }
          >
            Cancel
          </button>

        </div>

      </div>

    ))}

  </div>

</div>

);
}

export default Appointments;
