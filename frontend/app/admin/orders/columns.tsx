"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order, OrderItem, User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { OrderAction } from "./actions";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => {
      const user: User = row.getValue("user");
      return <div className="font-semibold">{user.name}</div>;
    },
  },
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
    header: "Action",
    cell: ({ row }) => {
      const rowData = row.original;
      

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2 w-10">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <OrderAction id={rowData.id}/>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
