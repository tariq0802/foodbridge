"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Address, Order } from "@/types/types";
import { jwtDecode } from "jwt-decode";

interface UserData {
  orders: Order[] | null;
  error: string | null; // Add an error field to the interface
}

const useOrders = (): UserData => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null); // Initialize error state
  const router = useRouter();

  useEffect(() => {
    const fetchOrderData = async () => {
      if (typeof window === "undefined") {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch address. Please try again later.");
      }
    };

    fetchOrderData();
  }, []);

  return { orders, error }; // Return error state along with address
};

export default useOrders;
