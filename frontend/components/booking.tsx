"use client";

import { Minus, Plus, Settings } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Login from "./login";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DeleteItem from "./delete-item";

interface FormData {
  user_id: number;
  food_id: number;
  quantity: number;
}

interface BookingProps {
  id: number;
  donorId: number;
}

const Booking: React.FC<BookingProps> = ({ id, donorId }) => {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { user, token } = useUser();

  const onSubmit = async (data: FormData, token: string) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/orders/`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setOpen(false);
      setModalOpen(true);
      return response.data;
    } catch (error: any) {
      toast("Something went wrong", {
        description: error.toString(),
      });
    }
  };

  const handleBooking = (token: string, userId: number, foodId: number) => {
    const formData: FormData = {
      user_id: id,
      food_id: foodId,
      quantity: count,
    };
    onSubmit(formData, token);
  };

  return (
    <div>
      {user && token ? (
        <>
          {!(user.is_staff || user.id === donorId) && (
            <>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    Book Item
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Book this item</DialogTitle>
                    <DialogDescription>
                      Kindly inform us how many items will need. Be aware that
                      quantity should be less than remain item.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <div className="col-span-3 flex items-center justify-center gap-2">
                        <div
                          onClick={() => {
                            if (count > 1) {
                              setCount(count - 1);
                            }
                          }}
                          className="rounded border-[1px] px-1 py-[2px] bg-rose-50 border-rose-400 cursor-pointer"
                        >
                          <Minus height={20} color="red" />
                        </div>
                        <p className="rounded bg-slate-200 px-4 text-sm font-medium py-1">
                          {count}
                        </p>
                        <div
                          onClick={() => setCount(count + 1)}
                          className="rounded border-[1px] px-1 py-[2px] bg-emerald-50 border-emerald-400 cursor-pointer"
                        >
                          <Plus height={20} color="green" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setConfirmOpen(true)}>Book</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure about this booking?</DialogTitle>
                    <DialogDescription>
                      Once booking placed, you cant cancel or edit anything in
                      your booking.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant={"outline"}
                      onClick={() => setConfirmOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleBooking(token, user.id, id)}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>This booking order sent!</DialogTitle>
                    <DialogDescription>
                      Please go to order page to see your booking status and
                      collect your ticket.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={() => router.push(`/profile/${user.id}/orders`)}
                    >
                      Go to Order
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
          {(user.is_staff || user.id === donorId) && (
            <div className="flex gap-4 items-center mt-4">
              <Link
                href={`/listings/${id}/update`}
                className={cn(buttonVariants({ variant: "default" }), "flex-1 gap-2")}
              >
                <Settings size={15} className="text-sky-500"/>
                Update
              </Link>
              <DeleteItem foodId={id}/>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-rose-500 font-medium">
            You have to log in to give this order
          </p>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Booking;
