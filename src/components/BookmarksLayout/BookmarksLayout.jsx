import { Outlet } from "react-router-dom";

function BookmarksLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      {/* Map */}
    </div>
  );
}

export default BookmarksLayout;
