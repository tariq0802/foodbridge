import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Address } from "@/types/types";
import { toast } from "sonner";
import useAddress from "@/hooks/use-address";

const AddressForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { address } = useAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>();

  const onSubmit = async (data: Address) => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      if (address) {
        console.log(data);

        const response = await axios.patch(
          `http://localhost:8000/api/address/me/`,
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        window.location.reload();
      } else {
        const response = await axios.post(
          `http://localhost:8000/api/address/`,
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        window.location.reload();
      }
    } catch (error: any) {
      toast(error.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            {address ? "Update Address" : "Create Address"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {address ? "Update address" : "Create an address"}
              </DialogTitle>
              <DialogDescription>
                {address
                  ? ""
                  : "Address is important for booking and listing food items."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Village / Road
                </Label>
                <Input
                  id="location"
                  {...register("location")}
                  className="col-span-2"
                  defaultValue={address?.location}
                  placeholder="Enter your village or house no"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="post_office" className="text-right">
                  Post Office
                </Label>
                <Input
                  id="post_office"
                  {...register("post_office")}
                  className="col-span-2"
                  defaultValue={address?.post_office}
                  placeholder="Enter your post office"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="police_station" className="text-right">
                  Police Station
                </Label>
                <Input
                  id="police_station"
                  {...register("police_station")}
                  className="col-span-2"
                  defaultValue={address?.police_station}
                  placeholder="Enter your police statin"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="district" className="text-right">
                  District
                </Label>
                <Input
                  id="district"
                  {...register("district")}
                  className="col-span-2"
                  defaultValue={address?.district}
                  placeholder="Enter your district"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Input
                  id="state"
                  {...register("state")}
                  className="col-span-2"
                  defaultValue={address?.state}
                  placeholder="Enter your state"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="pin" className="text-right">
                  Postal Code
                </Label>
                <Input
                  id="pin"
                  {...register("pin")}
                  className="col-span-2"
                  defaultValue={address?.pin}
                  placeholder="Enter your pin code"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Contact No
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  className="col-span-2"
                  defaultValue={address?.phone}
                  placeholder="Enter your phone no"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressForm;
