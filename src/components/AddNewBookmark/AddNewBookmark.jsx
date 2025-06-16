import { useState, useEffect } from "react";

import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import useUrlLocation from "../../hooks/useUrlLocation";
import Loader from "../Loader/Loader.jsx";
import { useBookmarks } from "../../context/BookmarksProvider.jsx";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const { lat, lng } = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      try {
        // Fetch city and country info based on lat/lng
        const {
          data: { city, countryName, countryCode },
        } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`,
        );

        // If it's not a valid city, show an error
        if (!countryCode)
          throw new Error(
            "this location is not a city! please click somewhere else.",
          );

        setCityName(city);
        setCountryName(countryName);
        setCountryCode(countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Don't do anything if required fields are missing
    if (!cityName || !countryName) return;

    const newBookmark = {
      id: Date.now(),
      cityName,
      countryName,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + countryName,
    };

    // Save the new bookmark and go back to bookmarks page
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  }

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <strong>{geoCodingError}</strong>;

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn--back"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </button>
          <button type="submit" className="btn btn--primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
