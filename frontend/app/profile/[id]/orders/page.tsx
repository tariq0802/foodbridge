"use client";

import { DataTable } from "@/components/data-table";
import useOrder from "@/hooks/use-orders";
import { orderColumns } from "../components/order-columns";

const UserOrderPage = () => {
  const { orders } = useOrder();

  return (
    <div>
      {orders && (
        <DataTable
          columns={orderColumns}
          data={orders}
          column_name={"status"}
        />
      )}
    </div>
  );
};

export default UserOrderPage;
