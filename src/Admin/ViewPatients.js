import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminNavBar'
import './ViewPatient.css'

export default function ViewPatients({ patientId }) {
  const [patients, setPatients] = useState([]);

  console.log(patientId);

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
  }, [patientId]);
  

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
                
                 
               </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align="center">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}