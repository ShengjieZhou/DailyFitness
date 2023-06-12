import {useEffect, useState} from "react";
import React from 'react';
import {GoogleMap, useLoadScript, MarkerF, InfoWindow} from "@react-google-maps/api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../stylesheets/map.css";

export default function Home() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyBZjmD-a2Gdodaut8MWuZHGAtz3Euso0qQ",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map/>;
}

function Map() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(  () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const location = latitude + "," + longitude ; // 经纬度坐标（例如：纬度，经度）
    console.log(location);
    fetch('http://localhost:5000/api/places/nearbysearch?location=' + location)
      .then(res => res.json())
      .then(data => {
        setGyms(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, [latitude]);
  console.log(gyms.status);


  if (latitude === null || longitude === null || gyms.status === "INVALID_REQUEST" ) {
    return (
      <>
        <Header/>
        <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
          <Sidebar/>
          <p>.... Loading...</p>;
        </div>
      </>
    );
  }
  const center = ({lat: latitude, lng: longitude});
  const handleMarkerClick = (marker) => {
    console.log(marker);
    setSelectedMarker(marker);
    console.log(selectedMarker);
  };

  return (
    <>
      <Header/>
      <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
        <Sidebar/>
        <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" >
          <MarkerF position={center}/>
          {
            gyms.results.map(gym => (
              <MarkerF
                key={gym.name}
                position={{lat: gym.geometry.location.lat, lng: gym.geometry.location.lng}}
                onClick={() => handleMarkerClick(gym)}
              />
            ))
          }
          {selectedMarker != null && isLoading === false &&(
            <InfoWindow
              position={{ lat: selectedMarker.geometry.location.lat, lng: selectedMarker.geometry.location.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              {(
                <div>
                  <h3>{selectedMarker.name}</h3>
                  <p>{selectedMarker.vicinity}</p>
                </div>
              )}
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </>
  );
}

