import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";

function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchHotels() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${url}?${query}`, {
          signal,
        });
        setData(data);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Canceled");
        } else {
          toast.error(error?.massage);
          throw new Error(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchHotels();

    return () => controller.abort();
  }, [url, query]);

  return { data, isLoading };
}

export default useFetch;
