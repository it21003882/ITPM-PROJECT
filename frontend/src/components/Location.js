import { useMemo } from 'react';
import { GoogleMap,useLoadScript,MarkerF } from '@react-google-maps/api';
import './Location.css';

export function Location() {
  
  const {isLoaded} = useLoadScript({

    googleMapsApiKey:"AIzaSyDddNXTHG6JZM3tQqYku4GG027xDSclxrI",
    libraries:["places"],
  });
  
  if (!isLoaded) return <div>Loading...</div>;
  return <Map/>;

}

function Map(){

  const mark = useMemo(() => ({lat:7.2008,lng:79.8737}),[]);

  return(
    <>
    <div>
            <h1>HIIIII</h1>

      </div>
      
      <GoogleMap
          zoom={8}
          center={{ lat: 8.00, lng: 80.00 }}
          mapContainerClassName="map-container"
      >
              <MarkerF position={mark} />

          </GoogleMap></>
  );
}
