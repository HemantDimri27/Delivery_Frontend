import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const styles = {
    body: {
      background_color: 'black',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '50%',
    },
    subContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      width: '150px',
      height: '30px',
      margin: '5px',
    }
  }

  return (
    <div className='body' style={styles.body}>
      <div className='container' style={styles.container}>
        <div className='usersContainer' style={styles.subContainer}>
          <Link to="/AllUsers" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>All users</button>
          </Link>
          <Link to="/CreateUser" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Create User</button>
          </Link>
          <Link to="/DeleteUser" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>DeleteUser</button>
          </Link>
          <Link to="/LoginUser" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>LoginUser</button>
          </Link>
          <Link to="/UpdateUser" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>UpdateUser</button>
          </Link>
        </div>


        <div className='Result' style={styles.subContainer}>
          <h1>Welcome</h1>
          <Link to="/GoogleMap" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>GoogleMap</button>
          </Link>
          <Link to="/DeliveryMap" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>DeliveryMap</button>
          </Link>
        </div>


        <div className='inventorys' style={styles.subContainer}>
          <Link to="/AllInventory" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>All Inventory</button>
          </Link>
          <Link to="/CreateInventory" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Create Inventory</button>
          </Link>
          <Link to="/DeleteInventory" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Delete Inventory</button>
          </Link>
          <Link to="/UpdateInventory" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Update Inventory</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home