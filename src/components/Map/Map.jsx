import { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";

import Loader from "../Loader/Loader.jsx";

import { useHotels } from "../../context/HotelsProvider.jsx";

function Map() {
  const { hotels, isLoading } = useHotels();

  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  // === Get latitude and longitude from url ===
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // === Update map center only if lat and lng exist ===
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  if (isLoading) return <Loader />;

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter postion={mapCenter} />
        {hotels.map((hotel) => (
          <Marker position={[hotel.latitude, hotel.longitude]} key={hotel.id}>
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
