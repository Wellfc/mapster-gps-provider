"use strict";

/* Map */

const trackButton = document.querySelector("#track-btn");
const flyButton = document.querySelector("#fly-btn");
let lat, long;

mapboxgl.accessToken = 'pk.eyJ1Ijoid2VsbGZjIiwiYSI6ImNscTE5azY3eDAzeGwyaXIycTgyMnM0ZW8ifQ.0Bp9MRAu0DmdRpUI8lnDPg';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // center: [-97.171995, 49.803435], // starting position [lng, lat]
  // 97.1702272, 49.8204672
  center: [-97.143173, 49.895313], // starting position [lng, lat]
  zoom: 9, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v12' // style URL
});

function getLocation(position) {
  const { latitude, longitude } = position.coords;
  console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);

  lat = latitude;
  long = longitude;

  goCenter(latitude, longitude);

  createMarker(latitude, longitude);
}

// Center the map on the coordinates of the user's position
function goCenter(latitude, longitude) {
  map.flyTo({
    center: [longitude, latitude],
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    zoom: 16
  });
}

// Create a marker on the map
function createMarker(latitude, longitude) {
  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({ offset: 20 }).setText(
    'Mapster'
  );

  // Create a default Marker and add it to the map.
  const marker = new mapboxgl.Marker({ color: '#0599ff', scale: 0.6, rotation: 0 })
    .setLngLat([longitude, latitude])
    .setPopup(popup)  // sets a popup on this marker
    .addTo(map);
}

// The error/failure callback function
function errorHandler(error) {
  console.log(error.message);
}

// don't use the cached location
const options = {
  maximumAge: 0,
  timeout: 5000,
  enableHighAccuracy: true
};

// Track button click event handler
trackButton.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(getLocation, errorHandler, options);
  } else {
    alert('Geolocation API is not supported by your browser');
  }
  flyButton.style.visibility = 'visible';
});

// Fly button click event handler
flyButton.addEventListener('click', () => {
  goCenter(lat, long);
});