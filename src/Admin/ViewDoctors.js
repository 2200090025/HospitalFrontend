import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminNavBar';
import './ViewDoctors.css';

export default function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://hospital.up.railway.app/viewalldoctors');
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };

    fetchDoctors();
  }, []);

  const handleStatus = async (doctorId, status) => {
    try {
      const response = await axios.put(`https://hospital.up.railway.app/doctorstatus`, null, {
        params: {
          id: doctorId,
          status: status,
        },
      });
      alert(response.data); // Show success message from the server

      // Update the doctor status in the local state to avoid re-fetching all doctors
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === doctorId ? { ...doctor, status: status } : doctor
        )
      );
    } catch (error) {
      console.error("Error updating doctor status:", error.message);
    }
  };

  return (
    <div className="content-area">
      <div className="view-appointments">
        <h1>Doctors List</h1>
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
              <th>Actions</th>
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
                    <button onClick={() => handleStatus(doctor.id, 'Accepted')}>Accept</button>
                    <button onClick={() => handleStatus(doctor.id, 'Rejected')}>Reject</button>
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
