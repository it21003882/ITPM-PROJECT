import { useMemo, useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerF,
} from '@react-google-maps/api';
import './assests/Map.css';

import Header from '../IT21022388/Header';
import Footer from '../IT21003882/FOoter';

function UserMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDddNXTHG6JZM3tQqYku4GG027xDSclxrI',
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const mark = useMemo(
    () => ({ lat: 7.2008, lng: 79.8737 }, { lat: 7.3008, lng: 79.8735 }),
    []
  );
  const marktwo = useMemo(
    () => ({ lat: 7.1008, lng: 79.8732 }, { lat: 7.3008, lng: 79.8735 }),
    []
  );

  const mapOptions = {
    zoom: 12,
    center: { lat: 7.2508, lng: 79.8736 },

    center: currentLocation || { lat: 7.2508, lng: 79.8736 } || {
        lat: 7.1008,
        lng: 79.872,
      },
    // Center the map at a specific location
  };

  const markers = [
    { lat: 7.2008, lng: 79.8737 },
    { lat: 7.1008, lng: 79.872 },
    { lat: 7.3008, lng: 79.972 },
    // Add more coordinates as needed
  ];

  const currentLocationMarkerOptions = {
    position: currentLocation,
    icon: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: 'yellow',
      fillOpacity: 1,
      strokeWeight: 0,
    },
  };

  function searchHandler() {}

  return (
    <>
      <Header />
      <div>
        <h1>Waste Management centers </h1>
        <nav class="navbar navbar-light bg-light">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search by management centers"
            aria-label="Search"
          />
        </nav>
        <button type="button" class="btn btn-light" onClick={searchHandler}>
          Search
        </button>
      </div>

      <GoogleMap
        zoom={8}
        center={{ lat: 8.0, lng: 80.0 }}
        mapContainerClassName="map-container"
      >
        <MarkerF position={marktwo} />
        <MarkerF position={mark} />

        {currentLocation && <Marker options={currentLocationMarkerOptions} />}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
      <Footer />
    </>
  );
}
export default UserMap;
