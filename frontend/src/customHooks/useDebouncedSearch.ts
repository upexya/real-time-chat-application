import { useState, useEffect } from "react";

import axios from "src/services/axiosInstance";
import useDebounce from "./useDebounce"; // Import the debounce hook

const useDebouncedSearch = (options: {
  query: string;
  delay?: number;
  api: string;
}) => {
  const { query, delay = 500, api } = options;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${api}?q=${debouncedQuery}`, {
          signal,
        });
        setResults(response.data);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    return () => controller.abort(); // Cancel previous request
  }, [debouncedQuery]);

  return { results, loading, error };
};

export default useDebouncedSearch;
