import { createContext, useContext, useState } from "react";

import axios from "axios";

import useFetch from "../hooks/useFetch";

const BookmarksContext = createContext();

const BASE_URL = "http://localhost:3000/bookmarks";

function BookmarksProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  const { data: bookmarks, isLoading } = useFetch(BASE_URL);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        isLoadingCurrentBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context)
    throw new Error("useBookmarks was call out side of BookmarksProvider!");
  return context;
}
