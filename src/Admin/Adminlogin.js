import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style.css';
import { useNavigate } from 'react-router-dom';

export default function Adminlogin({onAdminLogin}) {
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const [message,setMessage]=useState("")
  const [error,setError]=useState("")

  const location = useLocation();
  const activeLogin = location.pathname;  

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    { console.log(data.username)
      console.log(data.password)
      const response = await axios.post('http://localhost:2220/adminlogin', data , {
        
      });
      console.log(response.data)
      if (response.data) 
      {
        onAdminLogin();

        localStorage.setItem('admin', JSON.stringify(response.data));

        navigate("/adminhome");
      } 
      else 
      {
        setMessage("Incorrect Username or password")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
    //console.log(data);
  };

  return (
    <div className="login-page">
      
      <section className="login-section">
        <div className="login-content">
        {
         message ? <h4 align="center" style={{color:"red"}}>{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
          
          <div className="toggle-buttons">
          <Link to="/login" className={`toggle-button patient-login ${activeLogin === '/login' ? 'active' : ''}`}>Patient</Link>
              
              <Link to="/doctorlogin" className={`toggle-button doctor-login ${activeLogin === '/doctorlogin' ? 'active' : ''}`}>Doctor</Link>
              
              <Link to="/adminlogin" className={`toggle-button admin-login ${activeLogin === '/adminlogin' ? 'active' : ''}`}>Admin</Link>
            <div className="toggle-selector"></div>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
          
      
            <div className="form-group">
              <label>Username</label>
              <input type="text" id='username' onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" id='password' onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
           
          </form>
        </div>
      </section>
    </div>
  );
}
