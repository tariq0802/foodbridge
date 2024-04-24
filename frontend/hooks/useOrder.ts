import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Order } from "@/types/types";

interface UserData {
  order: Order | null;
  error: string | null;
}

const useOrder = (id: string): UserData => {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!id) {
        return; // If 'id' is not provided, return early
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found."); // Set error if token is not found
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setOrder(response.data); // Set 'order' state with fetched data
      } catch (error) {
        setError("Failed to fetch order. Please try again later."); // Set error if fetch fails
      }
    };

    fetchOrderData(); // Call fetchOrderData when component mounts or 'id' changes
  }, [id]); // Include 'id' in the dependency array

  return { order, error }; // Return 'order' and 'error' states
};

export default useOrder;
