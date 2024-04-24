import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/types";

interface UserData {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null; // New error state
  logout: () => void;
}

const useUser = (): UserData => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Initialize error as null
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const authToken = localStorage.getItem("token");
      setToken(authToken);
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/me`, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null); // Clear error state on logout
    router.push("/");
    window.location.reload();
  };

  return { user, logout, token, loading, error }; // Include error state in the returned object
};

export default useUser;
