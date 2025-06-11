import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

import Loader from "../Loader/Loader.jsx";
import { useBookmarks } from "../../context/BookmarksProvider.jsx";

function Bookmarks() {
  const { bookmarks, isLoading, currentBookmark } = useBookmarks();

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>Bookmarks List</h2>
      <div className="bookmarkList">
        {bookmarks.map((bookmark) => {
          return (
            <Link
              to={`/bookmarks/${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
              key={bookmark.id}
            >
              <div
                className={`bookmarkItem ${bookmark.id === currentBookmark.id && "current-bookmark"}`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={bookmark.countryCode} />
                  &nbsp; <strong>{bookmark.cityName}</strong> &nbsp;
                  <span>{bookmark.country}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
