"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./component/columns";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
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

      const response = await axios.get(`http://127.0.0.1:8000/api/users/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
    };
    fetchUsersData();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold">User data</h3>
      {data && <DataTable columns={columns} data={data} column_name="name" />}
    </div>
  );
};

export default AdminPage;
