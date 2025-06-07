import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="applayout">
      <div className="sidebar">{<Outlet />}</div>
      {/* Map */}
    </div>
  );
}
export default AppLayout;
