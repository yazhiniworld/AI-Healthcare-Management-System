import { useEffect, useState } from "react";
import { FaUserCircle, FaSave, FaTimes } from "react-icons/fa";
import { getPatientByUserId, updatePatient } from "../services/patientService";
import "./MyProfile.css";

function MyProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    patientId: "",
    patientName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    disease: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    status: "Active",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getPatientByUserId(user.userId);
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await updatePatient(profile.patientId, profile);
      alert("Profile Updated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-title">
        <span>PATIENT</span>
        <h1>My Profile</h1>
      </div>

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-header-left">
            <div className="profile-icon">
              <FaUserCircle />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>
                Update your personal details and keep your profile up to date.
              </p>
            </div>
          </div>

        </div>

        <div className="profile-grid">

          <div className="form-group">
            <label>Full Name</label>
            <input
              name="patientName"
              value={profile.patientName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={profile.age || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <input
              name="bloodGroup"
              value={profile.bloodGroup || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              value={profile.address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Disease / Condition</label>
            <textarea
              name="disease"
              rows="3"
              value={profile.disease || ""}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="section-title">
          Emergency Contact
        </div>

        <div className="profile-grid">

          <div className="form-group">
            <label>Emergency Contact Name</label>
            <input
              name="emergencyContactName"
              value={profile.emergencyContactName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Emergency Contact Phone</label>
            <input
              name="emergencyContactPhone"
              value={profile.emergencyContactPhone || ""}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="profile-buttons">

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            <FaSave />
            Save Profile
          </button>

          <button
            className="cancel-btn"
            onClick={loadProfile}
          >
            <FaTimes />
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default MyProfile;