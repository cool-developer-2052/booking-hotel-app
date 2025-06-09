import { createContext, useContext, useState } from "react";

import { useSearchParams, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import useFetch from "../hooks/useFetch.js";

// Create context for hotels data
const HotelsContext = createContext();

const BASE_URL = "http://localhost:3000/hotels";

function HotelsProvider({ children }) {
  const [currentHotel, setCurrnetHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("guestOptions"))?.room;

  // Fetch hotel data using custom hook
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`,
  );

  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrnetHotel(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        isLoading,
        getHotel,
        currentHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}
export default HotelsProvider;

/**
 * Custom hook to access hotels context
 * Throws an error if used outside of HotelsProvider
 */
export function useHotels() {
  const context = useContext(HotelsContext);
  if (!context)
    throw new Error("useHotels was call out side of HotelsProvider!");
  return context;
}
