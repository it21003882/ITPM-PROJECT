import { useState, useMemo } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import './assests/Map.css';
import axios from 'axios';
import Header from '../IT21003882/AdminHeader';
import Footer from '../IT21003882/FOoter';

function AdminMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDddNXTHG6JZM3tQqYku4GG027xDSclxrI',
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const mark = useMemo(() => ({ lat: 7.2008, lng: 79.8737 }), []);

  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Function to add a new marker
  const addMarker = () => {
    if (newMarker) {
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setNewMarker(null);
    }
    // Make the POST request to add the address details to the database
    axios
      .post(`http://localhost:5000/map/save`, {
        address: JSON.stringify(newMarker),
      })
      .then((response) => {
        console.log('Address added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding address:', error);
      });
  };

  // Function to remove a marker
  const removeMarker = (marker) => {
    setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== marker));
    setSelectedMarker(null);
  };

  // Function to update a marker
  const updateMarker = (updatedMarker) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((m) => (m === selectedMarker ? updatedMarker : m))
    );
    setSelectedMarker(null);
  };

  // Function to select a marker
  const selectMarker = (marker) => {
    setSelectedMarker(marker);
  };

  // Function to geocode an address and convert it to latitude and longitude
  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        const { lat, lng } = location;
        setNewMarker({ lat: lat(), lng: lng() });
      } else {
        console.error(
          'Geocode was not successful for the following reason:',
          status
        );
      }
    });
  };

  return (
    <>
      <div>
        <Header />
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter address to delete Add "
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => geocodeAddress(e.target.value)}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              onClick={addMarker}
            >
              Add
            </button>
          </div>
        </div>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter address to delete"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              onClick={() => removeMarker(selectedMarker)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <GoogleMap
        zoom={8}
        center={{ lat: 8.0, lng: 80.0 }}
        mapContainerClassName="map-container"
        onClick={(e) => geocodeAddress(e.latLng)}
      >
        {/* Render the markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            onClick={() => selectMarker(marker)}
          />
        ))}

        {/* Render the selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={() => setSelectedMarker(null)}
          >
            {/* Add your InfoWindow content here */}

            {/* You can show marker details, edit/delete options, etc. */}
            <div>
              <p>Latitude: {selectedMarker.lat}</p>
              <p>Longitude: {selectedMarker.lng}</p>
              <button onClick={() => removeMarker(selectedMarker)}>
                Delete
              </button>
              <button onClick={() => updateMarker({ lat: 9.0, lng: 81.0 })}>
                Update
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <Footer />
    </>
  );
}
export default AdminMap;
