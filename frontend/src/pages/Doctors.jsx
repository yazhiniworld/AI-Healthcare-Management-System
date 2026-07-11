import { useMemo, useState, useEffect } from "react";
import {
  FaPlus,
  FaUserMd,
  FaStethoscope,
  FaPhone,
} from "react-icons/fa";

import "./Doctors.css";
import doctorService from "../services/doctorService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role?.toUpperCase() || "";

  const canManageDoctors =
    role === "ADMIN";

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
  try {
    const data =
      await doctorService.getAllDoctors();

    console.log(data);

    setDoctors(data);

  } catch (error) {
    console.error(
      "Error loading doctors:",
      error
    );
  }
};
  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        doctor.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.specialization
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  const addDoctor = async () => {

  if (
    !newDoctor.name ||
    !newDoctor.specialization ||
    !newDoctor.experience ||
    !newDoctor.phone
  ) {
    alert("Please fill all fields");
    return;
  }

  try {

    await doctorService.addDoctor({
      name: newDoctor.name,
      specialization: newDoctor.specialization,
      experience: newDoctor.experience,
      phone: newDoctor.phone
    });

    await loadDoctors();

    setNewDoctor({
      name: "",
      specialization: "",
      experience: "",
      phone: ""
    });

    setShowAdd(false);

  } catch (error) {

    console.error(
      "Error adding doctor:",
      error
    );

  }
};

const removeDoctor = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this doctor?"
    );

  if (!confirmDelete) return;

  try {

    console.log(
      "Deleting doctor:",
      id
    );

    await doctorService.deleteDoctor(id);

    await loadDoctors();

  } catch (error) {

    console.error(
      "Error deleting doctor:",
      error
    );

  }
};

  return (
    <div className="doctors-page">

      <div className="doctors-header">
        <div>
          <h1>Doctors Management</h1>

          <p>
            Manage doctors,
            specialists and
            availability.
          </p>
        </div>

        {canManageDoctors && (
          <button
            className="doctor-add-btn"
            onClick={() =>
              setShowAdd(true)
            }
          >
            <FaPlus /> Add Doctor
          </button>
        )}
      </div>

      <div className="doctor-stats">

        <div className="doctor-stat-card">
          <h2>{doctors.length}</h2>
          <p>Total Doctors</p>
        </div>

        <div className="doctor-stat-card">
          <h2>
            {
              [
                ...new Set(
                  doctors.map(
                    (d) =>
                      d.specialization
                  )
                ),
              ].length
            }
          </h2>

          <p>Specializations</p>
        </div>

      </div>

      <div className="doctor-search-container">

        <input
          className="doctor-search"
          type="text"
          placeholder="Search doctor or specialization..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>

      <div className="doctor-grid">

        {filteredDoctors.map(
          (doctor) => (
            <div
              className="doctor-card"
              key={doctor.id}
            >
              <div className="doctor-avatar">
                <FaUserMd />
              </div>

              <h3>
                {doctor.name}
              </h3>

              <span className="badge">
                {
                  doctor.specialization
                }
              </span>

              <div className="doctor-info">

                <p>
                  <FaStethoscope />
                  {" "}
                  {
                    doctor.experience
                  }{" "}
                  Years Experience
                </p>

                <p>
                  <FaPhone />
                  {" "}
                  {doctor.phone}
                </p>

              </div>

              {canManageDoctors && (
                <div className="doctor-actions">

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>{
                      console.log("Doctor ID:", doctor.id);
                       removeDoctor(doctor.id);
                    }}
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>
          )
        )}

      </div>

      {showAdd &&
        canManageDoctors && (
          <div className="doctor-modal">

            <div className="doctor-modal-content">

              <h2>
                Add New Doctor
              </h2>

              <input
                type="text"
                placeholder="Doctor Name"
                value={
                  newDoctor.name
                }
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    name:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Specialization"
                value={
                  newDoctor.specialization
                }
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    specialization:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Experience"
                value={
                  newDoctor.experience
                }
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    experience:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                value={
                  newDoctor.phone
                }
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    phone:
                      e.target
                        .value,
                  })
                }
              />

              <button
                className="save-doctor-btn"
                onClick={
                  addDoctor
                }
              >
                Save Doctor
              </button>

              <button
                className="delete-btn"
                style={{
                  marginTop:
                    "10px",
                }}
                onClick={() =>
                  setShowAdd(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>

          </div>
        )}

    </div>
  );
}

export default Doctors;