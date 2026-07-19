import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch
} from "react-icons/fa";

import userService from "../services/userService";
import "./Users.css";

export default function Users() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "ADMIN",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {

    const userData = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!userData || userData.role !== "ADMIN") {
      navigate("/");
      return;
    }

    fetchUsers();

  }, [navigate]);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const data = await userService.getAllUsers();

      setUsers(data);

    } catch (err) {

      console.error(err);
      setError("Unable to load users");

    } finally {

      setLoading(false);

    }
  };

  const filteredUsers = useMemo(() => {

    const query = search.toLowerCase();

    return users.filter(
      (user) =>
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query)
    );

  }, [users, search]);

  const handleEdit = (user) => {

    setSelectedUser(user);

    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this user permanently?"
      )
    ) {
      return;
    }

    try {

      await userService.deleteUser(id);

      setSuccess("User deleted successfully");

      fetchUsers();

    } catch (err) {

      console.error(err);
      setError("Unable to delete user");

    }
  };

  const handleApprove = async (id) => {

    try {

      await userService.approveDoctor(id);

      setSuccess("Doctor approved successfully");

      fetchUsers();

    } catch (err) {

      console.error(err);
      setError("Unable to approve doctor");

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (selectedUser) {

        await userService.updateUser(
          selectedUser.userId,
          formData
        );

        setSuccess(
          "User updated successfully"
        );

      } else {

        await userService.createUser({
          ...formData,
          password: "P@ssw0rd",
        });

        setSuccess(
          "User created successfully"
        );
      }

      setSelectedUser(null);

      setFormData({
        username: "",
        email: "",
        role: "ADMIN",
      });

      fetchUsers();

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to save user"
      );
    }
  };

  return (
    <div className="users-container">

      <div className="users-header">

        <div>
          <h1>User Management</h1>

          <p>
            View, edit, remove users
            and approve doctors.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/register")
          }
        >
          <FaPlus /> Add User
        </button>

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {success && (
        <div className="success">
          {success}
        </div>
      )}

      <div className="users-grid">

        <div className="users-table-card">

          <div className="users-table-head">

            <div>
              <h2>All Users</h2>
              <p>
                Search by name,
                email or role.
              </p>
            </div>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search users"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="loading-row"
                    >
                      Loading users...
                    </td>
                  </tr>

                ) : filteredUsers.length ===
                  0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="loading-row"
                    >
                      No users found
                    </td>
                  </tr>

                ) : (

                  filteredUsers.map(
                    (user) => (
                      <tr
                        key={user.userId}
                      >
                        <td>
                          {user.userId}
                        </td>

                        <td>
                          {user.username}
                        </td>

                        <td>
                          {user.email}
                        </td>

                        <td>
                          {user.role}
                        </td>

                        <td>

                          {user.role ===
                          "DOCTOR" ? (
                            user.approved ? (
                              <span className="approved-badge">
                                Approved
                              </span>
                            ) : (
                              <span className="pending-badge">
                                Pending
                              </span>
                            )
                          ) : (
                            "-"
                          )}

                        </td>

                        <td>

                          <button
                            className="icon-btn edit"
                            onClick={() =>
                              handleEdit(
                                user
                              )
                            }
                          >
                            <FaEdit />
                          </button>

                          {user.role ===
                            "DOCTOR" && (
                            <button
                              className="icon-btn"
                              onClick={() =>
                                setViewDoctor(
                                  user
                                )
                              }
                            >
                              View
                            </button>
                          )}

                          {user.role ===
                            "DOCTOR" &&
                            !user.approved && (
                              <button
                                className="icon-btn approve"
                                onClick={() =>
                                  handleApprove(
                                    user.userId
                                  )
                                }
                              >
                                Approve
                              </button>
                            )}

                          <button
                            className="icon-btn delete"
                            onClick={() =>
                              handleDelete(
                                user.userId
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </td>
                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        <div className="users-form-card">

          <h2>
            {selectedUser
              ? "Edit User"
              : "Quick Add"}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>
              Username
            </label>

            <input
              value={
                formData.username
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username:
                    e.target.value,
                })
              }
            />

            <label>Email</label>

            <input
              type="email"
              value={
                formData.email
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
            />

            <label>Role</label>

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role:
                    e.target.value,
                })
              }
            >
              <option value="ADMIN">
                ADMIN
              </option>

              <option value="DOCTOR">
                DOCTOR
              </option>

              <option value="PATIENT">
                PATIENT
              </option>
            </select>

            <button
              className="primary-btn"
              type="submit"
            >
              {selectedUser
                ? "Save Changes"
                : "Create User"}
            </button>

          </form>

        </div>

      </div>

      {viewDoctor && (

        <div className="doctor-modal">

          <div className="doctor-modal-content">

            <h2>
              Doctor Verification
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {viewDoctor.username}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {viewDoctor.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {viewDoctor.phone}
            </p>

            <p>
              <strong>Specialization:</strong>{" "}
              {viewDoctor.specialization}
            </p>

            <p>
              <strong>License:</strong>{" "}
              {viewDoctor.licenseNumber}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {viewDoctor.experience}
              Years
            </p>

            <p>
              <strong>Certificate:</strong>
              {viewDoctor.certificatePath}
            </p>

            <a
              href={`https://ai-healthcare-management-system-im8h.onrender.com/uploads/${viewDoctor.certificatePath}`}
target="_blank"
rel="noreferrer"
className="view-certificate-btn"
            >
               View Uploaded Certificate
            </a>

            <button
              className="secondary-btn"
              onClick={() =>
                setViewDoctor(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

