import { useMemo, useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import {
  getAllPatients,
  addPatient as createPatient,
  deletePatient
} from "../services/patientService";

import "./Patients.css";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
	bloodGroup: "",
    address: "",
    disease: "",
    status: "Active"
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getAllPatients();

      const formatted = data.map((patient) => ({
        id: patient.patientId,
        name: patient.patientName,
        age: patient.age,
        gender: patient.gender,
        phone: patient.phone,
        bloodGroup: patient.bloodGroup,
        address: patient.address,
        disease: patient.disease,
        status: patient.status
      }));

      setPatients(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name?.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone?.includes(search)
    );
  }, [patients, search]);

  const handleAddPatient = async () => {
    if (
      !newPatient.name ||
      !newPatient.age ||
      !newPatient.gender ||
      !newPatient.phone
    ) {
      return;
    }

    try {
      const payload = {
        patientName: newPatient.name,
        age: parseInt(newPatient.age),
        gender: newPatient.gender,
        phone: newPatient.phone,
        bloodGroup: newPatient.bloodGroup,
        address: newPatient.address,
        disease: newPatient.disease,
        status: newPatient.status
      };

      await createPatient(payload);

      await loadPatients();

      setNewPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
      });

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);
      await loadPatients();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="patients-page">

      <div className="page-header">
        <div>
          <p className="eyebrow">Patient Care</p>

          <h1>Patient Directory</h1>

          <p>
            Search, manage and review patients
            from a secure workspace.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Patient
        </button>
      </div>

      <div className="patient-summary-grid">

        <div className="stat-card">
          <span>Total Patients</span>
          <h2>{patients.length}</h2>
        </div>

        <div className="stat-card soft">
          <span>Active Cases</span>
          <h2>{patients.length}</h2>
        </div>

        <div className="stat-card soft">
          <span>Under Review</span>
          <h2>0</h2>
        </div>

      </div>

      <div className="search-bar">
        <div className="search-input">
          <FaSearch />

          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      <div className="patient-table-wrap">

        <table className="patient-table">

          <thead>
            <tr>
              <th>Patient</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
			  <th>Blood Group</th>
<th>Disease</th>
<th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredPatients.map((patient) => (
              <tr key={patient.id}>

                <td>
                  <div className="patient-name-cell">

                    <div className="patient-icon">
                      {patient.name?.charAt(0)}
                    </div>

                    <div>
                      <strong>{patient.name}</strong>
                      <span>{patient.phone}</span>
                    </div>

                  </div>
                </td>

                <td>{patient.age}</td>

                <td>{patient.gender}</td>

                <td>{patient.phone}</td>

                <td>{patient.bloodGroup}</td>
                <td>{patient.disease}</td>
                <td>
                  <span className="status-badge active">
                    {patient.status}
                  </span>
                </td>

                <td>

                  <button className="icon-btn soft">
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn danger"
                    onClick={() =>
                      handleDeletePatient(patient.id)
                    }
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-panel glass-card">

            <div className="modal-header">

              <h3>Add New Patient</h3>

              <button
                className="close-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                &times;
              </button>

            </div>

            <div className="modal-body">

              <input
                type="text"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    name: e.target.value
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
               <input
  type="text"
  placeholder="Blood Group"
  value={newPatient.bloodGroup}
  onChange={(e) =>
    setNewPatient({
      ...newPatient,
      bloodGroup: e.target.value
    })
  }
/>

<input
  type="text"
  placeholder="Disease"
  value={newPatient.disease}
  onChange={(e) =>
    setNewPatient({
      ...newPatient,
      disease: e.target.value
    })
  }
/>

<textarea
  placeholder="Address"
  value={newPatient.address}
  onChange={(e) =>
    setNewPatient({
      ...newPatient,
      address: e.target.value
    })
  }
/>

<select
  value={newPatient.status}
  onChange={(e) =>
    setNewPatient({
      ...newPatient,
      status: e.target.value
    })
  }
>
  <option value="Active">Active</option>
  <option value="Under Review">Under Review</option>
  <option value="Discharged">Discharged</option>
</select>


            </div>

            <button
              className="primary-btn stretch"
              onClick={handleAddPatient}
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