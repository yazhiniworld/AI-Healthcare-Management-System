import { useEffect, useState } from "react";
import { getAllPatients, addPatient } from "../services/patientService";
import "./Patients.css";

function Patients() {

const [patients, setPatients] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [showForm, setShowForm] = useState(false);

const [newPatient, setNewPatient] = useState({
patientName: "",
age: "",
gender: "",
phone: ""
});

useEffect(() => {
loadPatients();
}, []);

const loadPatients = async () => {
try {
const data = await getAllPatients();
setPatients(data);
} catch (error) {
console.error(error);
}
};

const handleSavePatient = async () => {
try {


  await addPatient(newPatient);

  setNewPatient({
    patientName: "",
    age: "",
    gender: "",
    phone: ""
  });

  setShowForm(false);

  loadPatients();

} catch (error) {
  console.error(error);
}

};

const filteredPatients = patients.filter((patient) =>
patient.patientName
.toLowerCase()
.includes(searchTerm.toLowerCase())
);

return ( <div className="patients-page">
  <h1>Patients Management</h1>

  <div className="stats-container">

    <div className="stat-card">
      <h2>{patients.length}</h2>
      <p>Total Patients</p>
    </div>

    <div className="stat-card">
      <h2>
        {patients.filter(
          (p) => p.gender === "Male"
        ).length}
      </h2>
      <p>Male</p>
    </div>

    <div className="stat-card">
      <h2>
        {patients.filter(
          (p) => p.gender === "Female"
        ).length}
      </h2>
      <p>Female</p>
    </div>

  </div>

  <div className="top-bar">

    <input
      type="text"
      placeholder="Search Patient..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button
      className="add-btn"
      onClick={() => setShowForm(true)}
    >
      + Add Patient
    </button>

  </div>

  <div className="patient-grid">

    {filteredPatients.map((patient) => (

      <div
        key={patient.patientId}
        className="patient-card"
      >

        <div className="avatar">
          👤
        </div>

        <h3>{patient.patientName}</h3>

        <p>Age: {patient.age}</p>

        <p>Gender: {patient.gender}</p>

        <p>Phone: {patient.phone}</p>

        <div className="card-buttons">

          <button className="edit-btn">
            Edit
          </button>

          <button className="delete-btn">
            Delete
          </button>

        </div>

      </div>

    ))}

  </div>

  {showForm && (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Add Patient</h2>

        <input
          type="text"
          placeholder="Patient Name"
          value={newPatient.patientName}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              patientName: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              age: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Gender"
          value={newPatient.gender}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              gender: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          value={newPatient.phone}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              phone: e.target.value
            })
          }
        />

        <button
          className="save-btn"
          onClick={handleSavePatient}
        >
          Save Patient
        </button>

      </div>

    </div>

  )}

</div>

);
}

export default Patients;
