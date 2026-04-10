"use client"
import { useEffect, useState } from "react";

export const useFetch = (apiCall: any, params?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (customParams?: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiCall(customParams || params);
      console.log("API Response:", res);

      const result = res?.data?.data || res?.data?.jobs || res?.data?.reviews || res?.data || [];
      setData(result);

    } catch (err) {
      console.error("API Error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};