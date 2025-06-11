import { Outlet } from "react-router-dom";
import Map from "../Map/Map.jsx";
import Loader from "../Loader/Loader.jsx";

import { useHotels } from "../../context/HotelsProvider.jsx";

function AppLayout() {
  const { hotels, isLoading } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">{<Outlet />}</div>
      {isLoading ? <Loader /> : <Map markedLocations={hotels} />}
    </div>
  );
}
export default AppLayout;
