import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllUsers = () => {

  const [users, setUsers] = useState([])
  const [sort, setSort] = useState('desc'); 
  const [date, setDate] = useState('');      

  const handleSubmit = async(event)=>{
    event.preventDefault();
    
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.get('/api/delivery/allUsers', { headers: {Authorization: `Bearer ${token}`}, params: { sort, date }})                      
      .then((res)=>{
        setUsers(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }


  const handleSortChange = (e) => setSort(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);



  console.log(users);


const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333',
    margin: '10px',
    padding: '10px'
  },
  userContainer: {
    width: '100%',
  },
  userCard: {
    backgroundColor: '#333',
    margin: '5px',
    padding: '10px',
    width: '50%'
  },
  form: {
    display: 'flex', 
    gap: '40px', 
    margin: '20px 0', 
    backgroundColor: '#444',
    alignItems: 'center',
    height: '65px'
  },
  formData: {
    fontSize: '20px'
  },
  formButton: {
    backgroundColor: 'lightgreen',
    height: '30px'
  },
}


  

  return (
    <div className='body' style={styles.body}>
      <div className='navBaer' style={styles.navbar}>
        <p>.</p>
        <h1>Users</h1>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={styles.button}>Home</button>
        </Link>
      </div>

      {/* Sort and Date Inputs */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={{display: 'flex'}}>
          <label style={styles.formData} htmlFor="sort">Sort by Date:</label>
          <select name="sort" value={sort} onChange={handleSortChange} >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
        <div style={styles.formData}>
          <label htmlFor="date">Registrated on :</label>
          <input type="date" id="date" placeholder="Enter your date" name="date" value={date} onChange={handleDateChange} />
        </div>
        <button type='submit' style={styles.formButton}>Get Users</button>
      </form>


      <div className='userContainer' style={styles.userContainer}>
        {users.map((user)=>(
          <div style={styles.userCard} key={user._id}>
            <div>name : {user.name}</div>
            <div>Mobile : {user.mobile}</div>
            <div>Registration on : {user.time_of_registration}</div>
            <div>latitude : {user.coordinates.latitude}</div>
            <div>longitude : {user.coordinates.longitude}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
