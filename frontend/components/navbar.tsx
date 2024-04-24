"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Login from "./login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookA, CircleUser, Headset, HeartHandshake, Home, HomeIcon, List, ListTodo, LogOut, ShieldBan, ShoppingBag, ShoppingCart, User, Users } from "lucide-react";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import ProfileLight from "@/icons/profile-light";
import SideNav from "./sidenav";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false)

  return (
    <div className="absolute top-0 left-0 right-0 z-10 py-4 mt-2 font-medium">
      <div className=" container max-w-7xl flex flex-row justify-between items-center gap-6">
        <Link href={"/"} className=" flex-grow">
          <h4 className="text-xl text-neutral-100 font-semibold cursor-pointer">
            Food Bridge
          </h4>
        </Link>
        <NavigationMenu className="sm:block hidden">
          <NavigationMenuList className="*:text-neutral-200">
            <NavigationMenuItem>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-1 hover:bg-pink-600 hover:text-gray-100"
                )}
              >
                <Home size={18} className="text-sky-300" />
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-1 hover:bg-pink-600 hover:text-gray-100"
                )}
              >
                <BookA size={18} className="text-sky-400" />
                About
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-1 hover:bg-pink-600 hover:text-gray-100"
                )}
              >
                <Headset size={18} className="text-sky-400" />
                Contact
              </Link>
            </NavigationMenuItem>

            {user ? (
              <div>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <CircleUser className=" text-pink-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    <div className="mx-auto mt-2 h-12 w-12">
                      <ProfileLight />
                    </div>
                    <DropdownMenuLabel className="text-center">
                      {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-200" />
                    <DropdownMenuGroup>
                      <Link href={`/profile/${user.id}`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-3 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/profile/${user.id}/orders`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <ShoppingBag className="mr-3 h-4 w-4" />
                          <span>Bookings</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/profile/${user.id}/donations`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <HeartHandshake className="mr-3 h-4 w-4" />
                          <span>Donations</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-slate-200" />
                    {user && user.is_staff && (
                      <div>
                        <div className="pb-1 w-full text-sm font-semibold">
                          Admin Area
                        </div>
                        <div className="text-slate-600">
                          <Link href={`/admin`}>
                            <div
                              onClick={() => setOpen(false)}
                              className="cursor-pointer flex items-center hover:bg-slate-200 px-2 py-1.5 text-sm rounded font-medium"
                            >
                              <Users className="mr-3 h-4 w-4" />
                              <span>Users</span>
                            </div>
                          </Link>
                          <Link href={`/admin/listings`}>
                            <div
                              onClick={() => setOpen(false)}
                              className="cursor-pointer flex items-center hover:bg-slate-200 px-2 py-1.5 text-sm rounded font-medium"
                            >
                              <ListTodo className="mr-3 h-4 w-4" />
                              <span>Listings</span>
                            </div>
                          </Link>
                          <Link href={`/admin/orders`}>
                            <div
                              onClick={() => setOpen(false)}
                              className="cursor-pointer flex items-center hover:bg-slate-200 px-2 py-1.5 text-sm rounded font-medium"
                            >
                              <ShoppingCart className="mr-3 h-4 w-4" />
                              <span>Orders</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                    <DropdownMenuSeparator className="bg-slate-200" />
                    <DropdownMenuItem>
                      <LogOut className="mr-3 h-4 w-4" />
                      <button onClick={() => logout()}>Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Login />
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="sm:hidden block text-white">
          <SideNav user={user} logout={logout} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
