"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Food, User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ListingActions } from "./actions";

export const columns: ColumnDef<Food>[] = [
  {
    accessorKey: "food_name",
    header: "Name",
    cell: ({ row }) => {
      const name: string = row.getValue("food_name");
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "is_published",
    header: "status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_published");
      return isActive ? (
        <div>
          <Badge>Published</Badge>
        </div>
      ) : (
        <div>
          <Badge variant={"destructive"}>Pending</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "posted_by",
    header: "Donor",
    cell: ({ row }) => {
      const posted_by: User = row.getValue("posted_by");
      return posted_by.name;
    },
  },
  {
    accessorKey: "address",
    header: "Area",
    cell: ({ row }) => {
      const posted_by: User = row.getValue("posted_by");
      return (
        posted_by.address?.post_office +
        ", " +
        posted_by.address?.police_station
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "posted_at",
    header: "Posted",
    cell: ({ row }) => {
      const posted = format(new Date(row.getValue("posted_at")), "d/M/yy");
      return posted
    },
  },
  {
    accessorKey: "expired_at",
    header: "Expiry date",
    cell: ({ row }) => {
      const expiry = format(new Date(row.getValue("posted_at")), "d/M/yy");
      return expiry
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const rowData = row.original;
      console.log(rowData.is_published);
      

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
            <ListingActions
              id={rowData.id}
              isPublished={rowData.is_published}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
