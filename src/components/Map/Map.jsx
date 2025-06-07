import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import useFetch from "../../hooks/useFetch.js";

const BASE_URL = "http://localhost:3000";

function Map() {
  const { data: hotels, isLoading } = useFetch(`${BASE_URL}/hotels`);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
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
