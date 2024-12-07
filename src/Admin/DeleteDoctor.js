import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminNavBar';
import './DeleteDoctor.css';

export default function DeleteDoctors({ docId }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`https://hospital.up.railway.app/viewalldoctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch doctors");
      }
    };

    fetchDoctor();
  }, [docId]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:2220/deletedoctor?id=${id}`);
      if (response.status === 200) {
        setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
      } else {
        setError(response.data);
      }
    } catch (error) {
      console.error(error.message);
      setError("Failed to delete doctor");
    }
  };
  

  return (
    <div className="content-area">
      <div className="view-appointments">
        <h1>Doctors List</h1>
        {error && <p className="error-message">{error}</p>}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Doctor Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Specialization</th>
              <th>Location</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Timings</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.dateofbirth}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.location}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.contact}</td>
                  <td>{doctor.status}</td>
                  <td>{doctor.timings}</td>
                  <td>{doctor.password}</td>
                  <td>
                    <button onClick={() => handleDelete(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" align="center">No doctors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
