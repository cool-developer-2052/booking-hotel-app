import "./App.css";
import Header from "./components/Header/Header.jsx";
import LocationList from "./components/LocationList/LocationList.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </>
  );
}

export default App;
