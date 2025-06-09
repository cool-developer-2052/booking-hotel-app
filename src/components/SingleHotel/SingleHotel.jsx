import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch.js";
import Loader from "../Loader/Loader.jsx";

const BASE_URL = "http://localhost:3000/hotels";

function SingleHotel() {
  // === Get hotel ID from url ===
  const { id } = useParams();

  // === Fetch hotel data using the ID ===
  const { data: hotel, isLoading } = useFetch(`${BASE_URL}/${id}`);

  if (isLoading) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{hotel.name}</h2>
        <div>
          {hotel.number_of_reviews} reviews &bull; {hotel.smart_location}
        </div>
        <img src={hotel.xl_picture_url} alt={hotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
