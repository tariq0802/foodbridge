"use client";

import { DataTable } from "@/components/data-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";

const OrderAdmin = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchUsersData = async () => {
      if (typeof window === "undefined") {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/orders/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
    };
    fetchUsersData();
  }, []);

  return <div>
    {data && <DataTable columns={columns} data={data} column_name="status" />}
    </div>;

};

export default OrderAdmin;
