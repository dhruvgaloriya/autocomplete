import { useEffect, useState } from "react";
import useDebounce from "./use-debouce";

const useFetchData = <T>(
  url: string,
  query: string,
  debounceDelay: number,
  mockData?: T[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, debounceDelay);

  const resetState = () => {
    setData([]);
    setLoading(false);
    setError(null);
  };

  const simulateDelay = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchFromMockData = async () => {
    if (!mockData) return;

    await simulateDelay(750); // Simulated delay
    const filteredData = mockData.filter((item) =>
      (item as any).name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setData(filteredData);
  };

  const fetchFromApi = async () => {
    if (!url || !debouncedQuery) return;

    const response = await fetch(`${url}?search=${debouncedQuery}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    if (!debouncedQuery) {
      resetState();
      return;
    }

    const fetchData = async () => {
      resetState();
      setLoading(true);
      try {
        if (mockData) {
          await fetchFromMockData();
        } else {
          await fetchFromApi();
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false); // Always set loading to false when the operation completes
      }
    };

    fetchData();
  }, [url, debouncedQuery, mockData]);

  return { data, loading, error };
};

export default useFetchData;
