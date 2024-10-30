import React from 'react'

function ProjectMap() {

    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgs82c1GlN8j7ADTgQAnWUtH3oo-83i9U&callback=initMap"


    const style = {
        map: {
            height: '400px',  /* The height is 400 pixels */
            width: '600px',  /* The width is 600 pixels */
           },
    }


    // Initialize and add the map
    let map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 41, lng: -86}
      });

      const cities = [
        {lat: 41.88, lng: -87.62}, // Chicago
        {lat: 43.05, lng: -87.95}, // Milwaukee
        {lat: 42.33, lng: -83.04}, // Detroit
        {lat: 39.76, lng: -86.15}, // Indianapolis
        {lat: 38.62, lng: -90.19} // St. Louis
      ];

      // Loop through cities, adding markers
      for (let i=0; i<cities.length; i++) {
        let position = cities[i]; // location of one city
        // create marker for a city
        let mk = new google.maps.Marker({position: position, map: map});
      }

      // Add Distance Matrix here
    }


  return (
    <div id="map"></div>
  )
}

export default ProjectMap