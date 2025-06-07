import { useState, useEffect } from "react";

import useFetch from "../../hooks/useFetch.js";

const BASE_URL = "http://localhost:3000";

function LocationList() {
  const { data: hotels, isLoading } = useFetch(`${BASE_URL}/hotels`);

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {hotels.map((hotel) => {
          return (
            <div className="locationItem" key={hotel.id}>
              <img src={hotel.xl_picture_url} alt={hotel.name} />
              <div className="locationItemDesc">
                <p className="locaiton">{hotel.smart_location}</p>
                <p className="name">{hotel.name}</p>
                <p className="price">
                  €&nbsp;{hotel.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
