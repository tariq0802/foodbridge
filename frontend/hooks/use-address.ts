"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Address } from "@/types/types";

interface UserData {
  address: Address | null;
  error: string | null; // Add an error field to the interface
}

const useAddress = (): UserData => {
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null); // Initialize error state
  const router = useRouter();

  useEffect(() => {
    const fetchAddressData = async () => {
      if (typeof window === "undefined") {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/address/me/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setAddress(response.data);
      } catch (error) {
        setError("Failed to fetch address. Please try again later.");
      }
    };

    fetchAddressData();
  }, []);

  return { address, error }; // Return error state along with address
};

export default useAddress;
