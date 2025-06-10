import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

import useFetch from "../../hooks/useFetch.js";
import Loader from "../Loader/Loader.jsx";

const BASE_URL = "http://localhost:3000";

function Bookmarks() {
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>Bookmarks List</h2>
      <div className="bookmarkList">
        {bookmarks.map((bookmark) => {
          return (
            <div className="bookmarkItem" key={bookmark.id}>
              <div>
                <ReactCountryFlag svg countryCode={bookmark.countryCode} />
                &nbsp; <strong>{bookmark.cityName}</strong> &nbsp;
                <span>{bookmark.country}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
