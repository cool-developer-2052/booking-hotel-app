import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

import Loader from "../Loader/Loader.jsx";
import { useBookmarks } from "../../context/BookmarksProvider.jsx";

function Bookmarks() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length)
    return <strong>there is no bookmarked location</strong>;

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
                <button onClick={(e) => handleDelete(e, bookmark.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
