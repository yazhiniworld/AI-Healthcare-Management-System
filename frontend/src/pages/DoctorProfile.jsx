import { useEffect, useState } from "react";
import { FaUserMd, FaSave, FaTimes } from "react-icons/fa";
import {
  getDoctorByUserId,
  updateDoctor,
} from "../services/doctorService";
import "./MyProfile.css";

function DoctorProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    doctorId: "",
    doctorName: "",
    specialization: "",
    experience: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getDoctorByUserId(user.userId);
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
      await updateDoctor(profile.doctorId, profile);
      alert("Doctor Profile Updated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    }
  };

  return (
    <div className="patient-dashboard">

      <div className="profile-title">
        <span>DOCTOR</span>
        <h1>My Profile</h1>
      </div>

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-header-left">

            <div className="profile-icon">
              <FaUserMd />
            </div>

            <div>
              <h2>Professional Information</h2>
              <p>
                Update your professional details and keep your profile up to date.
              </p>
            </div>

          </div>

        </div>

        <div className="profile-grid">

          <div className="form-group">
            <label>Doctor Name</label>
            <input
              name="doctorName"
              value={profile.doctorName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <input
              name="specialization"
              value={profile.specialization || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={profile.experience || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={profile.phone || ""}
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
            Save Changes
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

export default DoctorProfile;