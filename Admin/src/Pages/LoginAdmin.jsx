import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "./Auth.css";
import { useAuth } from "../Context/AuthContext";
import "./LoginAdmin.css"
import logo from "../assets/logo.png"

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();//ngan chan hanh vi mac dinh cua su kien
    try {
      const res = await axios.post("http://localhost:5000/admin/auth/login", {
        username,
        password,
      });
      login(res.data.token);
      navigate("/admin");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <img src={logo}/>
        <h2 className="auth-title">Admin Login</h2>
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
