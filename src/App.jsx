import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import LocationList from "./components/LocationList/LocationList.jsx";
import AppLayout from "./components/AppLayout/AppLayout.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
