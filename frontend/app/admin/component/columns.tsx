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
import { Address, User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return <div className="font-semibold">{name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date_joined",
    header: "Joined",
    cell: ({ row }) => {
      const joined = new Date(row.getValue("date_joined"));
      return joined.toLocaleDateString();
    },
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active");
      return isActive ? (
        <div>
          <Badge>Active</Badge>
        </div>
      ) : (
        <div>
          <Badge variant={"destructive"}>Inactive</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "is_staff",
    header: "Admin",
    cell: ({ row }) => {
      const isStaff = row.getValue("is_staff");
      return isStaff ? (
        <div>
          <Badge>Admin</Badge>
        </div>
      ) : (
        <div>
          <Badge variant={"secondary"}>User</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address: Address | null = row.getValue("address");
      if (address !== null) {
        return address.post_office + ", " + address.police_station
      } else {
        return "-"
      }
    },
  },
  {
    accessorKey: "address_phoen",
    header: "Contact",
    cell: ({ row }) => {
      const address: Address | null = row.getValue("address");
      if (address !== null) {
        return address.phone
      } else {
        return "-"
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
          <DropdownMenuContent align="end" className="pb-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rowData.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/foods/${rowData.id}`}>Take action</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/foods/${rowData.id}`}
                className={cn(buttonVariants())}
              >
                Delete user
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
