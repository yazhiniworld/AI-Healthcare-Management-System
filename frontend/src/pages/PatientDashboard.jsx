import { useEffect, useMemo, useState } from "react";
import { FaUserInjured, FaCalendarCheck, FaHeartbeat, FaUserMd, FaSearch, FaFileDownload, FaCalendarPlus } from "react-icons/fa";
import patientService from "../services/patientService";
import doctorService from "../services/doctorService";
import appointmentService from "../services/appointmentService";
import "./PatientDashboard.css";

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [booking, setBooking] = useState({
    doctorId: null,
    appointmentDate: "",
    appointmentTime: "",
    consultationMode: "In-person",
    reason: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [patientData, appointmentData, doctorData, reportData] = await Promise.all([
          patientService.getPatientByUserId(user.userId),
          appointmentService.getAppointmentsByPatientUser(user.userId),
          doctorService.getAllDoctors(),
          patientService.getPatientReports(user.userId),
        ]);

        setPatient(patientData);
        setAppointments(appointmentData);
        setDoctors(doctorData);
        setReports(reportData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const searchDoctors = async (query) => {
    setSearchTerm(query);
    try {
      if (!query.trim()) {
        setDoctors(await doctorService.getAllDoctors());
        return;
      }
      setDoctors(await doctorService.searchDoctors(query));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookingChange = (field, value) => {
    setBooking((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookAppointment = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !selectedDoctor) {
      setMessage("Select a doctor and complete the booking form.");
      return;
    }

    if (!booking.appointmentDate || !booking.appointmentTime || !booking.reason) {
      setMessage("Please select date, time and reason for the appointment.");
      return;
    }

    try {
      await appointmentService.bookAppointment({
        patientUserId: user.userId,
        doctorId: selectedDoctor.id,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        consultationMode: booking.consultationMode,
        reason: booking.reason,
      });

      setMessage("Appointment booked successfully.");
      setBooking({
        doctorId: null,
        appointmentDate: "",
        appointmentTime: "",
        consultationMode: "In-person",
        reason: "",
      });
      setSelectedDoctor(null);
      const appointmentData = await appointmentService.getAppointmentsByPatientUser(user.userId);
      setAppointments(appointmentData);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data || "Failed to book appointment.");
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await appointmentService.cancelAppointment(appointmentId);
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const appointmentData = await appointmentService.getAppointmentsByPatientUser(user.userId);
      setAppointments(appointmentData);
      setMessage("Appointment cancelled.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to cancel appointment.");
    }
  };

  const upcoming = appointments.filter((item) => item.status !== "COMPLETED" && item.status !== "CANCELLED");
  const completed = appointments.filter((item) => item.status === "COMPLETED");

  const doctorOptions = useMemo(() => doctors || [], [doctors]);

  return (
    <div className="patient-dashboard">
      <div className="patient-header">
        <div>
          <h1>Welcome back, {patient?.patientName || "Patient"}</h1>
          <p>Track your appointments, reports, and healthcare progress in one secure place.</p>
        </div>
        <div className="patient-actions">
          <span className="status-pill">{patient?.status || "ACTIVE"}</span>
        </div>
      </div>

      <div className="patient-grid">
        <div className="patient-card">
          <h2>{appointments.length}</h2>
          <p>Total appointments</p>
        </div>
        <div className="patient-card soft">
          <h2>{upcoming.length}</h2>
          <p>Upcoming visits</p>
        </div>
        <div className="patient-card">
          <h2>{patient?.age || "—"}</h2>
          <p>Age</p>
        </div>
        <div className="patient-card soft">
          <h2>{patient?.bloodGroup || "N/A"}</h2>
          <p>Blood group</p>
        </div>
      </div>

      {message && <div className="dashboard-message">{message}</div>}

      <div className="patient-section glass-card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Doctor search</p>
            <h2>Find the right specialist</h2>
          </div>
        </div>

        <div className="search-row">
          <div className="search-input">
            <FaSearch />
            <input
              type="text"
              placeholder="Search doctors by name or specialization"
              value={searchTerm}
              onChange={(e) => searchDoctors(e.target.value)}
            />
          </div>
        </div>

        <div className="doctor-list">
          {doctorOptions.length === 0 ? (
            <p>No approved doctors found.</p>
          ) : (
            doctorOptions.map((doctor) => (
              <div key={doctor.id} className="doctor-card-mini">
                <div>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialization} • {doctor.experience} yrs</p>
                </div>
                <button
                  className={selectedDoctor?.id === doctor.id ? "selected-btn" : "select-btn"}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setBooking((prev) => ({ ...prev, doctorId: doctor.id }));
                  }}
                >
                  {selectedDoctor?.id === doctor.id ? "Selected" : "Select"}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="booking-panel">
          <div className="booking-details">
            <h2>Book an appointment</h2>
            <p>Select your doctor, choose a date/time, and confirm your consultation.</p>
          </div>
          <div className="booking-form">
            <label>Doctor</label>
            <input
              type="text"
              value={selectedDoctor?.name || "Select a doctor above"}
              disabled
            />

            <label>Date</label>
            <input
              type="date"
              value={booking.appointmentDate}
              onChange={(e) => handleBookingChange("appointmentDate", e.target.value)}
            />

            <label>Time</label>
            <input
              type="time"
              value={booking.appointmentTime}
              onChange={(e) => handleBookingChange("appointmentTime", e.target.value)}
            />

            <label>Consultation mode</label>
            <select
              value={booking.consultationMode}
              onChange={(e) => handleBookingChange("consultationMode", e.target.value)}
            >
              <option>In-person</option>
              <option>Telehealth</option>
            </select>

            <label>Reason</label>
            <textarea
              value={booking.reason}
              onChange={(e) => handleBookingChange("reason", e.target.value)}
              placeholder="Why are you booking this visit?"
            />

            <button className="primary-btn" onClick={handleBookAppointment}>
              <FaCalendarPlus /> Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="patient-section glass-card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Appointment history</p>
            <h2>All visits and status updates</h2>
          </div>
        </div>
        <div className="appointment-table">
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>No appointment history available.</p>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.appointmentId} className="appointment-card">
                <div>
                  <h3>{appointment.doctor?.doctorName || "Doctor"}</h3>
                  <p>{appointment.appointmentDate} · {appointment.appointmentTime}</p>
                  <p>{appointment.consultationMode} • {appointment.reason}</p>
                </div>
                <div className="appointment-meta">
                  <span className={`status-chip ${appointment.status?.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                  {appointment.status === "PENDING" && (
                    <button className="cancel-btn" onClick={() => handleCancel(appointment.appointmentId)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="patient-section glass-card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Medical reports</p>
            <h2>Download completed reports</h2>
          </div>
        </div>
        <div className="report-list">
          {reports.length === 0 ? (
            <p>No reports uploaded yet.</p>
          ) : (
            reports.map((report) => {
              const downloadUrl = report.detailsUrl?.startsWith("http")
                ? report.detailsUrl
                : `http://localhost:8090/uploads/${report.detailsUrl}`;

              return (
                <div key={report.reportId} className="report-card">
                  <div>
                    <h3>{report.reportType || "Medical Report"}</h3>
                    <p>{report.reportDate}</p>
                    <p>{report.summary}</p>
                  </div>
                  <a className="download-link" href={downloadUrl} target="_blank" rel="noreferrer" download>
                    <FaFileDownload /> Download
                  </a>
                </div>
              );
            }))}
        </div>
      </div>  
    </div>
  );
}
