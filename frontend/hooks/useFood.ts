"use client";

import { Food } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useFood = (id: string) => {
  const [item, setItem] = useState<Food | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/foods/${id}/`
        );
        setItem(response.data);
      } catch (error) {
        setError("Failed to fetch address. Please try again later.");
      }
    };

    fetchData(id);
  }, [id]);

  return { item, error };
};

export default useFood;
