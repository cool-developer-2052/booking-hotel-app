import { Link } from "react-router-dom";

import Loader from "../Loader/Loader.jsx";

import { useHotels } from "../../context/HotelsProvider.jsx";

function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Result ({hotels.length})</h2>
      {hotels.map((hotel) => (
        <Link
          to={`${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
          key={hotel.id}
        >
          {/* Check if this is the currently selected hotel */}
          <div
            className={`searchItem ${hotel.id === currentHotel.id && "current-hotel"}`}
          >
            <img src={hotel.thumbnail_url} alt={hotel.name} />
            <div className="searchItemDesc">
              <p className="location">{hotel.smart_location}</p>
              <p className="name">{hotel.name}</p>
              €&nbsp;{hotel.price}&nbsp;
              <span>night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Hotels;
