import { useMemo, useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaUser,
  FaUserMd,
  FaClock
} from "react-icons/fa";

import "./Appointments.css";

import {
  getAllAppointments,
  getAppointmentsByDoctorUser,
  getAppointmentsByPatientUser,
  confirmAppointment,
  completeAppointment,
  cancelAppointment
} from "../services/appointmentService";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      let data = [];

      if (!user) {
        data = await getAllAppointments();
      } else if (user.role === "DOCTOR") {
        data = await getAppointmentsByDoctorUser(user.userId);
      } else if (user.role === "PATIENT") {
        data = await getAppointmentsByPatientUser(user.userId);
      } else {
        data = await getAllAppointments();
      }

      const formatted = data.map((appointment) => ({
        id: appointment.appointmentId,
        patient:
          appointment.patient?.patientName ||
          "Unknown Patient",
        doctor:
          appointment.doctor?.doctorName ||
          "Unknown Doctor",
        specialization:
          appointment.doctor?.specialization ||
          "General",
        date: appointment.appointmentDate,
        time: appointment.appointmentTime,
        status: appointment.status || "PENDING"
      }));

      setAppointments(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.patient
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.doctor
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [appointments, searchTerm]);

  const statusCounts = appointments.reduce(
    (acc, appointment) => {
      acc[appointment.status] =
        (acc[appointment.status] || 0) + 1;
      return acc;
    },
    {
      PENDING: 0,
      CONFIRMED: 0,
      COMPLETED: 0,
      CANCELLED: 0
    }
  );

  const updateStatus = async (id, status) => {
    try {
      if (status === "CONFIRMED") {
        await confirmAppointment(id);
      }

      if (status === "COMPLETED") {
        await completeAppointment(id);
      }

      if (status === "CANCELLED") {
        await cancelAppointment(id);
      }

      await loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="appointments-page">

      <h1>Appointments</h1>

      <p>
        Keep patient visits on schedule and monitor appointment status.
      </p>

      <div className="appointments-stats">

        <div className="appointment-stat-card">
          <h2>{appointments.length}</h2>
          <p>Total Appointments</p>
        </div>

        <div className="appointment-stat-card">
          <h2>{statusCounts.PENDING}</h2>
          <p>Pending</p>
        </div>

        <div className="appointment-stat-card">
          <h2>{statusCounts.CONFIRMED}</h2>
          <p>Confirmed</p>
        </div>

        <div className="appointment-stat-card">
          <h2>{statusCounts.COMPLETED}</h2>
          <p>Completed</p>
        </div>

      </div>

      <input
        className="appointment-search"
        type="text"
        placeholder="Search by patient, doctor, or specialty..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <div className="appointments-grid">

        {filteredAppointments.map(
          (appointment) => (
            <div
              key={appointment.id}
              className="appointment-card"
            >

              <div
                className={`status-badge ${appointment.status.toLowerCase()}`}
              >
                {appointment.status}
              </div>

              <h3>
                <FaUser />{" "}
                {appointment.patient}
              </h3>

              <p>
                <FaUserMd />{" "}
                {appointment.doctor}
                {" • "}
                {appointment.specialization}
              </p>

              <p>
                <FaCalendarCheck />{" "}
                {appointment.date}
              </p>

              <p>
                <FaClock />{" "}
                {appointment.time}
              </p>

              <div className="appointment-actions">

                <button
                  className="confirm-btn"
                  onClick={() =>
                    updateStatus(
                      appointment.id,
                      "CONFIRMED"
                    )
                  }
                >
                  Confirm
                </button>

                <button
                  className="complete-btn"
                  onClick={() =>
                    updateStatus(
                      appointment.id,
                      "COMPLETED"
                    )
                  }
                >
                  Complete
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    updateStatus(
                      appointment.id,
                      "CANCELLED"
                    )
                  }
                >
                  Cancel
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Appointments;