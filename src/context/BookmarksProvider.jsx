import { createContext, useContext } from "react";

import useFetch from "../hooks/useFetch";

const BookmarksContext = createContext();

const BASE_URL = "http://localhost:3000";

function BookmarksProvider({ children }) {
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  return (
    <BookmarksContext.Provider value={{ bookmarks, isLoading }}>
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
