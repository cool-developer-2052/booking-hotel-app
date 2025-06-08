import { useEffect, useState } from "react";

import Loader from "../Loader/Loader.jsx";

import { useHotels } from "../../context/HotelsProvider.jsx";

function Hotels() {
  const { hotels, isLoading } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Result ({hotels.length})</h2>
      {hotels.map((hotel) => (
        <div className="searchItem" key={hotel.id}>
          <img src={hotel.thumbnail_url} alt={hotel.name} />
          <div className="searchItemDesc">
            <p className="location">{hotel.smart_location}</p>
            <p className="name">{hotel.name}</p>
            €&nbsp;{hotel.price}&nbsp;
            <span>night</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hotels;
