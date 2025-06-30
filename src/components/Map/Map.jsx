import { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";

import useUrlLocation from "../../hooks/useUrlLocation.js";
import useGeoLocation from "../../hooks/useGeoLocation.js";

function Map({ markedLocations }) {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  // === Get latitude and longitude from url ===
  const { lat, lng } = useUrlLocation();

  const {
    isLoading: isLoadingGeoPosition,
    position: geoPosition,
    getPosition,
  } = useGeoLocation();

  // === Update map center only if lat and lng exist ===
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng) {
      setMapCenter([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="getLocation">
          {isLoadingGeoPosition ? "Loading ..." : " Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter postion={mapCenter} />
        {markedLocations.map((location) => (
          <Marker
            position={[location.latitude, location.longitude]}
            key={location.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

/*
 * ChangeCenter: Change map view center to the specified position
 */
function ChangeCenter({ postion }) {
  const map = useMap();
  map.setView(postion);
  return null;
}

/*
 * DetectClick: When user clicks on the map, go to the "Add Bookmark" page
 * and pass the clicked location (lat, lng) in the URL.
 */
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
