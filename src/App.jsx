import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import LocationList from "./components/LocationList/LocationList.jsx";
import AppLayout from "./components/AppLayout/AppLayout.jsx";
import Hotels from "./components/Hotels/Hotels.jsx";
import HotelsProvider from "./context/HotelsProvider.jsx";
import SingleHotel from "./components/SingleHotel/SingleHotel.jsx";

function App() {
  return (
    <HotelsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
