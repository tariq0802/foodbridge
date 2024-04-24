"use client";

import { Badge } from "@/components/ui/badge";
import Ticket from "@/icons/ticket";
import { Order, OrderItem, User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "item",
    header: "Booked item",
    cell: ({ row }) => {
      const item: OrderItem = row.getValue("item");
      const food_name = item && item?.food?.food_name;
      return food_name;
    },
  },
  {
    accessorKey: "items_quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const item: OrderItem = row.getValue("item");
      const quantity = item && item?.quantity;
      return quantity;
    },
  },
  {
    accessorKey: "placed_at",
    header: "Booked on",
    cell: ({ row }) => {
      const placed_at = new Date(row.getValue("placed_at"));
      return placed_at.toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      if (status === "S") {
        return <Badge variant={"default"}>approved</Badge>;
      } else if (status === "P") {
        return <Badge variant={"secondary"}>pending</Badge>;
      } else {
        return <Badge variant={"destructive"}>failed</Badge>;
      }
    },
  },
  {
    id: "ticket",
    cell: ({ row }) => {
      const rowData = row.original;
      console.log(rowData);

      return (
        <div>
          {rowData && rowData.status === "S" && (
            <Link href={`/profile/${rowData.user.id}/orders/${rowData.id}`}>
              <div className="h-9 w-9">
                <Ticket />
              </div>
            </Link>
          )}
        </div>
      );
    },
  },
];
