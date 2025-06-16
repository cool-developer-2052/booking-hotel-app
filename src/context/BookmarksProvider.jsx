import { createContext, useContext, useReducer, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext();

const BASE_URL = "http://localhost:3000/bookmarks";

const INITIAL_STATE = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: null,
};

function bookmarksReducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarkList/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== payload,
        ),
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, payload],
        currentBookmark: payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      throw new Error("Unknown action!!");
  }
}

function BookmarksProvider({ children }) {
  // Use useReducer to manage complex state transitions
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarksReducer,
    INITIAL_STATE,
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(BASE_URL, { signal });
        dispatch({ type: "bookmarkList/loaded", payload: data });
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Canceled");
        } else {
          toast.error(error?.message);
          throw new Error(error);
        }
        dispatch({
          type: "rejected",
          payload: "an Errror occurred in loading bookmarks",
        });
      }
    }
    fetchData();

    // Cancel the request if the component unmounts
    return () => controller.abort();
  }, []);

  async function getBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Errror occurred in loading bookmark",
      });
    }
  }

  // Delete a bookmark by ID
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Errror occurred in deleting bookmark",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(BASE_URL, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Errror occurred in creating bookmark",
      });
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        deleteBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;

// Custom hook to access bookmarks context
export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context)
    throw new Error("useBookmarks was call out side of BookmarksProvider!");
  return context;
}
