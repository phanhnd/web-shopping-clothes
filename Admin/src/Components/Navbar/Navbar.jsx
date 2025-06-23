import React from 'react';
import './Navbar.css';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/login")
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" style={{ width: "15%"}}/>
        <p>JYSTORE</p>
      </div>
      <div className="navbar_btn">
        <button onClick={handleAuthClick}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
