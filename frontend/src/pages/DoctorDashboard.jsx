import { useEffect, useState } from "react";
import "./DoctorDashboard.css";
import appointmentService from "../services/appointmentService";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadAppointments = async () => {
      if (!user || user.role !== "DOCTOR") {
        setLoading(false);
        return;
      }

      try {
        const data = await appointmentService.getAppointmentsByDoctorUser(
          user.userId
        );
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user]);

  const upcomingCount = appointments.filter(
    (item) => item.status !== "CANCELLED"
  ).length;

  const pending = appointments.filter(
    (item) => item.status === "PENDING"
  ).length;

  const confirmed = appointments.filter(
    (item) => item.status === "CONFIRMED"
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  return (
    <div className="doctor-dashboard">

      <h1>Welcome Dr. {user?.username || "Doctor"}</h1>

      <p>
        Manage appointments, patient visits, and reports from your dashboard.
      </p>

       
     <div className="doctor-cards">
        <div className="card">
          <h2>{upcomingCount}</h2>
          <p>Upcoming appointments</p>
        </div>

        <div className="card">
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="card">
          <h2>{confirmed}</h2>
          <p>Confirmed</p>
        </div>

        <div className="card">
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>
      </div>

      <div className="doctor-appointments">

        <div className="section-header">
          <h2>Today's appointments</h2>
          <p>Review your schedule and appointment status.</p>
        </div>

        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments scheduled yet.</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointmentId}
                className="appointment-row"
              >
                <div className="appointment-details">
                  <h3>
                    {appointment.patient?.patientName || "Patient"}
                  </h3>

                  <p>
                    {appointment.appointmentDate} ·{" "}
                    {appointment.appointmentTime}
                  </p>

                  <p>
                    {appointment.consultationMode} •{" "}
                    {appointment.reason}
                  </p>
                </div>

                <span
                  className={`status-pill ${appointment.status?.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default DoctorDashboard;