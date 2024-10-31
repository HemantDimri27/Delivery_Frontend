import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const DeleteUser = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const [responseMessage, setResponseMessage] = useState('');
  const [isLogined, setIsLogined] = useState(false);


  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response = await axios.post('/api/delivery/deleteUser', formData)
    console.log(response)
    setResponseMessage(response.data); 
    if(response.data.charAt(0) === 'U')
    setIsLogined(true);
  }

  
  const styles = {
    body: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      border: '1px solid white',
      padding: '20px',
      borderRadius: '5px',
      width: '300px',
      backgroundColor: '#333',
    },
    formTitle: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: 'white',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid white',
      backgroundColor: '#444',
      color: 'white',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#ddd',
    },
    responseMessage: {
      marginTop: '20px',
      color: 'white',
    },
    addButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Delete User</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input style={styles.input} type="email" id="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input style={styles.input} type="password" id="password" placeholder="Enter your password"  name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" style={styles.button}>Delete</button>
        </form>

        {/* Show response message */}
        <p style={styles.responseMessage}>{responseMessage}</p>

        {/* Conditionally render  */}
        {isLogined && (
          <button style={styles.addButton} onClick={() => window.location.href = '/'}>
            Home
          </button>
        )}

      </div>
    </div>
  );
};

export default DeleteUser;
