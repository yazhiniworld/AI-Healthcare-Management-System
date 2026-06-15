import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUserMd, FaSignInAlt } from 'react-icons/fa';
import authService from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess('');

    // basic validation
    if (!email || !password) {
      setError('Please provide email and password');
      setLoading(false);
      return;
    }
    try {
      const res = await authService.login({ email, password });
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res));
        setSuccess('Login successful — redirecting...');
        const role = res.role;
        setTimeout(() => {
          if (role === 'ADMIN') navigate('/');
          else if (role === 'DOCTOR') navigate('/doctors');
          else navigate('/appointments');
        }, 700);
      } else {
        setError(res.message || 'Invalid Credentials');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-panel">
          <div className="illustration"> 
            <FaUserMd size={120} color="#fff" />
          </div>
          <h2>Welcome to HealthPlus</h2>
          <p>Securely manage patients, doctors and appointments.</p>
        </div>

        <div className="right-panel">
          <div className="login-card">
            <h3>Sign in to your account</h3>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? <span className="spinner"/> : <><FaSignInAlt /> Login</>}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
