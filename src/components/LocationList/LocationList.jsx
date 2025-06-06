import { useState, useEffect } from "react";

import axios from "axios";

function LocationList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchHotels() {
      try {
        // Fetch hotel data from API with abort support
        const { data } = await axios.get("http://localhost:3000/hotels", {
          signal,
        });
        setHotels(data);
      } catch (error) {
        // Handle request cancellation
        if (error.name === "CanceledError") console.log("Canceled");
      }
    }
    fetchHotels();

    // Abort request on component unmount
    return () => controller.abort();
  }, []);

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
