import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminNavBar';
import './ViewPatient.css';

export default function DeletePatient({ docId }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`https://hospital.up.railway.app/viewallpatients`);
        setPatients(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPatients();
  }, [docId]);

  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`http://localhost:2220/deletepatient?id=${patientId}`);
      setPatients(patients.filter(patient => patient.id !== patientId)); // Update state to remove the deleted patient
    } catch (error) {
      console.error('Failed to delete patient:', error.message);
    }
  };

  return (
    <div className="content-area">
      <div className="view-appointments">
        <h1>Patients List</h1>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.dateofbirth}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.location}</td>
                  <td>{patient.email}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.password}</td>
                  <td>
                    <button onClick={() => deletePatient(patient.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" align="center">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
