import { createContext, useContext } from "react";

import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch.js";

// Create context for hotels data
const HotelsContext = createContext();

const BASE_URL = "http://localhost:3000/hotels";

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("guestOptions"))?.room;

  // Fetch hotel data using custom hook
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`,
  );

  return (
    <HotelsContext.Provider value={{ hotels, isLoading }}>
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
