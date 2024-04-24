"use client";

import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavProps {
  items: {
    title: string;
    href: string;
  }[];
  userId: string;
}

const UserNav: React.FC<AdminNavProps> = ({ items, userId }) => {
  const pathname = usePathname();
  const path = `/profile/${userId}/orders`;


  return (
    <div>
      <nav
        className={cn("flex space-x-2 justify-center lg:flex-col lg:space-x-0 lg:space-y-1 lg:ml-3")}
      >
          {items.map((item) => {
            return (
              <Link
                key={item.href}
                href={`/profile/${userId}/${item.href}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "rounded-none space-x-2 p-2",
                  pathname === `/profile/${userId}${item.href}`
                    ? "border-b-4 lg:border-l-4 lg:border-b-0 border-rose-500 hover:bg-muted"
                    : "hover:bg-muted",
                  "justify-start"
                )}
              >
                {item.title}
              </Link>
            );
          })}
      </nav>
    </div>
  );
};
export default UserNav;
