import { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

import { useBookmarks } from "../../context/BookmarksProvider.jsx";
import Loader from "../Loader/Loader.jsx";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getBookmark,
    currentBookmark: bookmark,
    isLoadingCurrentBookmark: isLoading,
  } = useBookmarks();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div className="currentBookmark">
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{bookmark.cityName}</h2>
      <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={bookmark.countryCode} />
        &nbsp; <strong>{bookmark.cityName}</strong> &nbsp;
        <span>{bookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
