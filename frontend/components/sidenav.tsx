import {
  BookA,
  HeartHandshake,
  Home,
  ListTodo,
  LogOut,
  Menu,
  ShoppingBag,
  ShoppingCart,
  Users,
  User as Usr,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { User } from "@/types/types";
import ProfileLight from "@/icons/profile-light";
import { DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import Link from "next/link";
import Login from "./login";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface SideNAvProps {
  user: User | null;
  logout: () => void;
}
const SideNav: React.FC<SideNAvProps> = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-[280px]">
        <SheetHeader>
          <div className="mx-auto mt-2 h-12 w-12">
            <ProfileLight />
          </div>
          {user && (
            <DropdownMenuLabel className="text-center">
              {user.name}
            </DropdownMenuLabel>
          )}
          <DropdownMenuSeparator className="bg-slate-200" />
        </SheetHeader>
        <div className="my-2">
          <div className="pb-1 w-full text-sm font-semibold">
            Navigation Menu
          </div>
          <div className="text-slate-600">
            <Link href={`/`}>
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
              >
                <Home className="mr-3 h-4 w-4" />
                <span>Home</span>
              </div>
            </Link>
            <Link href={`/about`}>
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
              >
                <BookA className="mr-3 h-4 w-4" />
                <span>About</span>
              </div>
            </Link>
            <Link href={`/contact`}>
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
              >
                <Home className="mr-3 h-4 w-4" />
                <span>Contact</span>
              </div>
            </Link>
          </div>
        </div>
        <Separator />
        {user ? (
          <div className="my-2">
            <div className="pb-1 w-full text-sm font-semibold">User Menu</div>
            <div className="text-slate-700">
              <Link href={`/profile/${user.id}`}>
                <div
                  onClick={() => setOpen(false)}
                  className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
                >
                  <Usr className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Link>
              <Link href={`/profile/${user.id}/orders`}>
                <div
                  onClick={() => setOpen(false)}
                  className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
                >
                  <ShoppingBag className="mr-3 h-4 w-4" />
                  <span>Bookings</span>
                </div>
              </Link>
              <Link href={`/profile/${user.id}/donations`}>
                <div
                  onClick={() => setOpen(false)}
                  className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
                >
                  <HeartHandshake className="mr-3 h-4 w-4" />
                  <span>Donations</span>
                </div>
              </Link>
            </div>
            {user.is_staff && (
              <div className="my-2">
                <Separator />
                <div className="pb-1 w-full text-sm font-semibold">
                  Admin Area
                </div>
                <div className="text-slate-600">
                  <Link href={`/admin`}>
                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
                    >
                      <Users className="mr-3 h-4 w-4" />
                      <span>Users</span>
                    </div>
                  </Link>
                  <Link href={`/admin/listings`}>
                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
                    >
                      <ListTodo className="mr-3 h-4 w-4" />
                      <span>Listings</span>
                    </div>
                  </Link>
                  <Link href={`/admin/orders`}>
                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer flex items-center hover:bg-slate-200 px-4 py-1.5 text-sm rounded font-medium"
                    >
                      <ShoppingCart className="mr-3 h-4 w-4" />
                      <span>Orders</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            <Separator />
            <Button className="w-full mt-4" variant={"outline"} size={"sm"}>
              <LogOut className="mr-3 h-4 w-4" />
              <button onClick={() => logout()}>Logout</button>
            </Button>
          </div>
        ) : (
          <div
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-center mt-4"
          >
            <Login />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
