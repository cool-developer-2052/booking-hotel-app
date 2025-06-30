import { useState } from "react";

// useGeoLocation: custom hook to get user's current location
function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  // Get user’s location from browser
  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your borwser does not support geoloction!!");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setError(error?.message);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}

export default useGeoLocation;
