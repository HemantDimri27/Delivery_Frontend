import React, { useEffect } from 'react';

// GoogleMap component
const GoogleMap = () => {
  useEffect(() => {
    // Load Google Maps script
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.head.appendChild(script);
      script.onload = initMap;
    };
    
    // Initialize the map
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center:{ lat: 12.9716, lng: 77.5946 },
      });

      const cities = [
        { lat: 12.9716, lng: 77.5946 },
      ];

      // Add markers for cities
      cities.forEach((position) => {
        new window.google.maps.Marker({ position, map });
      });
    };

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&callback=initMap`);
  }, []);

  return <div id="map" style={{ height: "400px", width: "600px" }} />;
};

export default GoogleMap;
