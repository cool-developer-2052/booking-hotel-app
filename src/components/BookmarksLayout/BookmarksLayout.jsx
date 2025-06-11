import { Outlet } from "react-router-dom";

import Map from "../Map/Map.jsx";
import Loader from "../Loader/Loader.jsx";

import { useBookmarks } from "../../context/BookmarksProvider.jsx";

function BookmarksLayout() {
  const { bookmarks, isLoading } = useBookmarks();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      {isLoading ? <Loader /> : <Map markedLocations={bookmarks} />}
    </div>
  );
}

export default BookmarksLayout;
