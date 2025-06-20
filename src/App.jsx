import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import LocationList from "./components/LocationList/LocationList.jsx";
import AppLayout from "./components/AppLayout/AppLayout.jsx";
import Hotels from "./components/Hotels/Hotels.jsx";
import HotelsProvider from "./context/HotelsProvider.jsx";
import SingleHotel from "./components/SingleHotel/SingleHotel.jsx";
import BookmarksLayout from "./components/BookmarksLayout/BookmarksLayout.jsx";
import Bookmarks from "./components/Bookmarks/Bookmarks.jsx";
import BookmarksProvider from "./context/BookmarksProvider.jsx";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark.jsx";

function App() {
  return (
    <BookmarksProvider>
      <HotelsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmarks" element={<BookmarksLayout />}>
            <Route index element={<Bookmarks />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarksProvider>
  );
}

export default App;
