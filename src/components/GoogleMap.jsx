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
        center: { lat: 41, lng: -86 },
      });

      const cities = [
        { lat: 41.88, lng: -87.62 }, // Chicago
        { lat: 43.05, lng: -87.95 }, // Milwaukee
        { lat: 42.33, lng: -83.04 }, // Detroit
        { lat: 39.76, lng: -86.15 }, // Indianapolis
        { lat: 38.62, lng: -90.19 }  // St. Louis
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
