import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { FaUserMd, FaSignInAlt } from 'react-icons/fa';
import authService from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please provide email and password');
      setLoading(false);
      return;
    }

    try {
      const res = await authService.login({
        email,
        password,
      });

      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res));

        setSuccess('Login successful — redirecting...');

        const role = (res.role || '').toUpperCase();

        setTimeout(() => {
          if (role === 'ADMIN') {
            navigate('/');
          } else if (role === 'DOCTOR') {
            if (res.approved === false) {
              navigate('/verification');
            } else {
              navigate('/doctor-dashboard');
            }
          } else if (role === 'PATIENT') {
            navigate('/patient-dashboard');
          } else {
            navigate('/');
          }
        }, 900);
      } else {
        setError(res.message || 'Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }

    setLoading(false);
  }

  return (
  <div className="login-page">

    <div className="login-container">

      <div className="left-panel">
        <FaUserMd className="health-icon" />

        <h1>Welcome to HealthPlus</h1>

        <p>
          Securely manage patients, doctors and appointments.
        </p>
      </div>

      <div className="right-panel">

        <div className="login-card">

          <h3>Sign in to your account</h3>

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

          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <FaSignInAlt />
                  Login
                </>
              )}
            </button>

            <div className="alt-action">
              <span>Don't have an account?</span>

              <Link
                to="/register"
                className="alt-link"
              >
                Register
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>
);
}