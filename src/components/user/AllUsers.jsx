import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllUsers = () => {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    axios.get('/api/delivery/allUsers')                      // proxy
    .then((res)=>{
      setUsers(res.data)
    })
  }, [])


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
  }
}


  

  return (
    <div className='body' style={styles.body}>
      <div className='navBaer' style={styles.navbar}>
        <p>.</p>
        <h1>All Users</h1>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={styles.button}>Home</button>
        </Link>
      </div>
      <div className='userContainer' style={styles.userContainer}>
        {users.map((user)=>(
          <div style={styles.userCard} key={user._id}>
            <div>name : {user.name}</div>
            <div>latitude : {user.coordinates.latitude}</div>
            <div>longitude : {user.coordinates.longitude}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
