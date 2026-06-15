import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaPhone,
  FaStethoscope,
  FaPlus
} from "react-icons/fa";

import {
  getAllDoctors,
  addDoctor,
  deleteDoctor
} from "../services/doctorService";

import "./Doctors.css";

function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    doctorName: "",
    specialization: "",
    experience: "",
    phone: ""
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveDoctor = async () => {
    try {
      await addDoctor(newDoctor);

      setShowForm(false);

      setNewDoctor({
        doctorName: "",
        specialization: "",
        experience: "",
        phone: ""
      });

      loadDoctors();

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);
      loadDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.doctorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">

      <div className="doctor-header">

        <div>
          <h1>Doctors Management</h1>
          <p>Manage doctors and specialists</p>
        </div>

        <button
          className="doctor-add-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Doctor
        </button>

      </div>

      <div className="doctor-stats">

        <div className="doctor-stat-card">
          <h2>{doctors.length}</h2>
          <p>Total Doctors</p>
        </div>

        <div className="doctor-stat-card">
          <h2>
            {
              [...new Set(
                doctors.map(
                  doctor => doctor.specialization
                )
              )].length
            }
          </h2>
          <p>Specializations</p>
        </div>

      </div>

      <div className="doctor-search-container">
        <input
          type="text"
          placeholder="Search doctor or specialization..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="doctor-search"
        />
      </div>

      <div className="doctor-grid">

        {filteredDoctors.map((doctor) => (

          <div
            className="doctor-card"
            key={doctor.doctorId}
          >

            <div className="doctor-avatar">
              <FaUserMd />
            </div>

            <h3>{doctor.doctorName}</h3>

            <span className="badge">
              {doctor.specialization}
            </span>

            <div className="doctor-info">

              <p>
                <FaStethoscope />
                {" "}
                {doctor.experience} Years Experience
              </p>

              <p>
                <FaPhone />
                {" "}
                {doctor.phone}
              </p>

            </div>

            <div className="doctor-actions">

              <button className="edit-btn">
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(
                    doctor.doctorId
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {showForm && (

        <div className="doctor-modal">

          <div className="doctor-modal-content">

            <h2>Add Doctor</h2>

            <input
              placeholder="Doctor Name"
              value={newDoctor.doctorName}
              onChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  doctorName: e.target.value
                })
              }
            />

            <input
              placeholder="Specialization"
              value={newDoctor.specialization}
              onChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  specialization: e.target.value
                })
              }
            />

            <input
              placeholder="Experience"
              value={newDoctor.experience}
              onChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  experience: e.target.value
                })
              }
            />

            <input
              placeholder="Phone"
              value={newDoctor.phone}
              onChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  phone: e.target.value
                })
              }
            />

            <button
              className="save-doctor-btn"
              onClick={saveDoctor}
            >
              Save Doctor
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Doctors;