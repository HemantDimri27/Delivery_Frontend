import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    coordinates: { latitude: null, longitude: null },
    password: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const addressInputRef = useRef(null);

  useEffect(() => {
    // Load Google Places Autocomplete
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => autoComplete();
    document.body.appendChild(script);
  }, []);

  const autoComplete = () => {
    if (addressInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current);
      autocomplete.setFields(['address_components', 'geometry']);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setFormData((prevData) => ({ ...prevData, address: addressInputRef.current.value,
            coordinates: {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            }
          }));
        }
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({...prevData,[name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if coordinates are set
    if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
      setResponseMessage('Please enter valid address.'); return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('/api/delivery/updateUser', formData , { headers: {Authorization: `Bearer ${token}`}});
      setResponseMessage(response.data);

      if(response.data.charAt(0) === 'U')
        setIsRegistered(true);

    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Failed to register. Please try again.');
    }
  };

 
  const styles = {
    body: { backgroundColor: 'black', color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    formContainer: { border: '1px solid white', padding: '20px', borderRadius: '5px', width: '300px', backgroundColor: '#333' },
    formTitle: { textAlign: 'center', marginBottom: '20px', color: 'white' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', color: 'white' },
    input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid white', backgroundColor: '#444', color: 'white' },
    button: { width: '100%', padding: '10px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    responseMessage: { marginTop: '20px', color: 'white' },
    addButton: { marginTop: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input style={styles.input} type="email" id="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Name</label>
            <input style={styles.input} type="text" id="name" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="mobile">Mobile</label>
            <input style={styles.input} type="number" id="mobile" placeholder="Enter your mobile" name="mobile" value={formData.mobile} onChange={handleChange}/>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="address">Address</label>
            <input style={styles.input} type="text" id="address" placeholder="Enter your address" name="address" value={formData.address} onChange={handleChange} ref={addressInputRef} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input style={styles.input} type="password" id="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" style={styles.button}>Update</button>
        </form>

        {/* Show response message */}
        <p style={styles.responseMessage}>{responseMessage}</p>

        {/* Conditionally render */}
        {isRegistered && (
          <button style={styles.addButton} onClick={() => window.location.href = '/'}>
            Home
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
