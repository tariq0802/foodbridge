"use client";

import { Category } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/categories/`
        );
        setCategories(response.data);
      } catch (error) {
        setError("Failed to fetch address. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return { categories, error }; 
};

export default useCategory;
