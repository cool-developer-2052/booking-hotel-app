import { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { HiArrowSmLeft } from "react-icons/hi";

import Loader from "../Loader/Loader.jsx";
import { useHotels } from "../../context/HotelsProvider.jsx";

const BASE_URL = "http://localhost:3000/hotels";

function SingleHotel() {
  // === Get hotel ID from url ===
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getHotel,
    currentHotel: hotel,
    isLoadingCurrentHotel: isLoading,
  } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoading || !hotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <button className="btn btn--back" onClick={() => navigate(-1)}>
          <HiArrowSmLeft className="icon" />
          Back
        </button>
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
