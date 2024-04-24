"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import DeleteItem from "@/components/delete-item";

export const donationColumns: ColumnDef<Food>[] = [
  
  {
    accessorKey: "posted_at",
    header: "Posted",
    cell: ({ row }) => {
      const posted = format(new Date(row.getValue("posted_at")), "d/M/yyyy");
      return posted;
    },
  },
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
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "expired_at",
    header: "Expiry date",
    cell: ({ row }) => {
      const expiry = format(new Date(row.getValue("expired_at")), "d/M/yyyy");
      return expiry;
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
          <DropdownMenuContent align="end" className="pb-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/listings/${rowData.id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteItem foodId={rowData.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
