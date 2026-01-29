import { useEffect, useState } from "react";

export const useFetch = (func) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      setLoading(true);

      console.log("Func", func);
      const data = await func();
      console.log("Data", data);
      setData(data);
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  return { loading, error, data };
};
