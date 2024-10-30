import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const DeliveryMap = () => {
  const center = { lat: 12.9716, lng: 77.5946 }; // Center of Bangalore
  
  // Inventory locations (starting and ending points)
  const inventory1 = { lat: 12.9719, lng: 77.6412 }; // Inventory 1 (Start point)
  const inventory2 = { lat: 12.9260, lng: 77.6762 }; // Inventory 2 (End point)
  
  // Customer locations
  const customers = [
    { lat: 12.9352, lng: 77.6245 },
    { lat: 12.9565, lng: 77.7010 },
    { lat: 12.9818, lng: 77.6361 },
    { lat: 12.9304, lng: 77.6787 },
    { lat: 12.9102, lng: 77.5869 },
    { lat: 12.9990, lng: 77.6431 },
    { lat: 12.9081, lng: 77.6512 },
    { lat: 12.9652, lng: 77.6101 },
    { lat: 12.9832, lng: 77.6963 },
    { lat: 12.9489, lng: 77.6055 }
  ];

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
