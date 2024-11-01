import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import axios from 'axios';

const DeliveryMap = () => {
  const center = { lat: 12.9716, lng: 77.5946 }; // Center of Bangalore

  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);

  
  useEffect(() => {
    try {
      const token = localStorage.getItem('jwtToken');

      // fetch data of inventoty
      axios.get('/api/delivery/allInventory', { headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          const inventoryCoords = res.data.map(user => ({
            lat: user.coordinates.latitude,
            lng: user.coordinates.longitude
          }));
          setInventory(inventoryCoords);
        })
      
      // fetch data of users
      axios.get('/api/delivery/allUsers', { headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          const customerCoords = res.data.map(user => ({
            lat: user.coordinates.latitude,
            lng: user.coordinates.longitude
          }));
          setCustomers(customerCoords);
        })
        
    } catch (error) {
      console.log(`error in Delevry map : ${error}`)
    }
  }, []);



  const [inventory1, inventory2] = inventory;  // destructured



  const [directions, setDirections] = useState(null);

  const handleMapLoad = () => {
    if (window.google && window.google.maps) {
      const waypoints = customers.map(location => ({ location, stopover: true }));

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: inventory1,
          destination: inventory2,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100vw" }}
        center={center}
        zoom={6}
        onLoad={handleMapLoad} // Ensure map loads first
      >
        <Marker position={inventory1} label="Inventory 1" />
        <Marker position={inventory2} label="Inventory 2" />
        {customers.map((customer, index) => (
          <Marker key={index} position={customer} label={`C${index + 1}`} />
        ))}
        
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default DeliveryMap;
