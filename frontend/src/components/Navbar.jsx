import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  function logout(){
    authService.logout();
    navigate('/login');
  }

  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,background:'#fff',boxShadow:'0 2px 8px rgba(2,6,23,0.06)'}}>
      <div style={{fontWeight:700}}>HealthPlus</div>
      {user && (
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontWeight:600}}>{user.username} | {user.role} | <button onClick={logout} style={{padding:'6px 8px',borderRadius:6,border:'none',background:'#ef4444',color:'#fff',cursor:'pointer'}}>Logout</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
