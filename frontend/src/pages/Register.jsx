import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserMd,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBriefcaseMedical,
  FaLock,
  FaUpload,
  FaCamera,
  FaUserPlus,
} from "react-icons/fa";

import authService from "../services/authService";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("DOCTOR");

  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [experience, setExperience] = useState("");

  const [certificate, setCertificate] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      let certificatePath = "";
      let photoPath = "";

      if (role === "DOCTOR") {
        if (certificate) {
          certificatePath =
            await authService.uploadCertificate(certificate);
        }

        if (photo) {
          photoPath =
            await authService.uploadCertificate(photo);
        }
      }

      const payload = {
        username,
        email,
        password,
        role,
      };

      if (role === "DOCTOR") {
        payload.phone = phone;
        payload.specialization = specialization;
        payload.licenseNumber = licenseNumber;
        payload.experience = experience;
        payload.certificatePath = certificatePath;
        payload.photoPath = photoPath;
      }

      const res = await authService.register(payload);

      if (res.success) {
        setSuccess(
          res.message || "Registration Successful"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1800);
      } else {
        setError(
          res.message || "Registration Failed"
        );
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
    }

    setLoading(false);
  }

  return (
    <div className="register-page">

      <div className="register-container">

        {/* LEFT PANEL */}

        <div className="register-left-panel">

          <div className="illustration-card">
            <FaUserMd className="illustration-icon" />
          </div>

          <h1>Join HealthPlus</h1>

          <p>
            Build your professional healthcare profile and
            access an intelligent hospital ecosystem.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              ✔ AI Powered Hospital Management
            </div>

            <div className="feature-item">
              ✔ Smart Appointment Scheduling
            </div>

            <div className="feature-item">
              ✔ Digital Medical Reports
            </div>

            <div className="feature-item">
              ✔ Secure Doctor Verification
            </div>

            <div className="feature-item">
              ✔ Modern Patient Dashboard
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="register-right-panel">

          <div className="register-card">

            <h2>Create Account</h2>

            <p className="subtitle">
              Complete the information below to register.
            </p>

            {error && (
              <div className="error">{error}</div>
            )}

            {success && (
              <div className="success">{success}</div>
            )}

            <form onSubmit={handleSubmit}>            {/* BASIC INFORMATION */}

              <div className="form-section">
                <h3>Basic Information</h3>

                <div className="form-grid">

                  <div className="input-group">
                    <label>Username</label>
                    <div className="input-wrapper">
                      <FaUser />
                      <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                      <FaEnvelope />
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Role</label>

                    <select
                      value={role}
                      onChange={(e) =>
                        setRole(e.target.value)
                      }
                    >
                      <option value="DOCTOR">
                        Doctor
                      </option>

                      <option value="PATIENT">
                        Patient
                      </option>

                    </select>
                  </div>

                  {role === "DOCTOR" && (
                    <div className="input-group">
                      <label>Phone Number</label>

                      <div className="input-wrapper">
                        <FaPhone />

                        <input
                          type="text"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* PROFESSIONAL INFORMATION */}

              {role === "DOCTOR" && (

                <div className="form-section">

                  <h3>Professional Information</h3>

                  <div className="form-grid">

                    <div className="input-group">
                      <label>Specialization</label>

                      <div className="input-wrapper">
                        <FaBriefcaseMedical />

                        <input
                          type="text"
                          placeholder="Cardiology"
                          value={specialization}
                          onChange={(e) =>
                            setSpecialization(
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Experience</label>

                      <input
                        type="number"
                        placeholder="5 Years"
                        value={experience}
                        onChange={(e) =>
                          setExperience(
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>License Number</label>

                      <div className="input-wrapper">
                        <FaIdCard />

                        <input
                          type="text"
                          placeholder="TN-MCI-12345"
                          value={licenseNumber}
                          onChange={(e) =>
                            setLicenseNumber(
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                  </div>

                  <div className="privacy-box">

                    <strong>🔒 Secure Verification</strong>

                    <p>
                      Your license, medical certificate and
                      profile photo are encrypted and used
                      only for doctor verification.
                    </p>

                  </div>

                                  <div className="upload-grid">

                    <div className="upload-card">

                      <label className="upload-title">
                        <FaUpload /> Medical Certificate
                      </label>

                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          setCertificate(e.target.files[0])
                        }
                      />

                      <span className="upload-file">
                        {certificate
                          ? certificate.name
                          : "Upload PDF Certificate"}
                      </span>

                    </div>

                    <div className="upload-card">

                      <label className="upload-title">
                        <FaCamera /> Profile Photo
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setPhoto(e.target.files[0])
                        }
                      />

                      <span className="upload-file">
                        {photo
                          ? photo.name
                          : "Upload Profile Image"}
                      </span>

                    </div>

                  </div>

                </div>

              )}

              {/* PASSWORD */}

              <div className="form-section">

                <h3>Security</h3>

                <div className="form-grid">

                  <div className="input-group">

                    <label>Password</label>

                    <div className="input-wrapper">

                      <FaLock />

                      <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                      />

                    </div>

                  </div>

                  <div className="input-group">

                    <label>Confirm Password</label>

                    <div className="input-wrapper">

                      <FaLock />

                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                      />

                    </div>

                  </div>

                </div>

              </div>

              <button
                className="register-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    <FaUserPlus />
                    Create Account
                  </>
                )}
              </button>

              <div className="register-bottom">

                <p>

                  Already have an account?

                  <Link to="/login">
                    Login
                  </Link>

                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}