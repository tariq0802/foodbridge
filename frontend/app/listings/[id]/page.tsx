import getImage from "@/actions/get-image";
import Booking from "@/components/booking";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Food } from "@/types/types";
import axios from "axios";
import {
  Calculator,
  CalendarDays,
  CalendarRange,
  LocateIcon,
  Phone,
  ShieldAlert,
  User,
  Workflow,
} from "lucide-react";
import Image from "next/image";

interface IParams {
  id?: string;
}

async function getFood(id: string | undefined): Promise<Food> {
  const response = await axios.get(`http://127.0.0.1:8000/api/foods/${id}/`);
  return response.data;
}

export default async function ListingDetail({ params }: { params: IParams }) {
  const { id } = params;
  const food = await getFood(id);
  const imagelink = getImage();

  return (
    <div className="my-6">
      <h1 className="text-2xl text-center font-bold mb-6 bg-sky-700 text-white p-2 rounded">
        {food.food_name}
      </h1>
      <div className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
        <div className="md:col-span-1 rounded overflow-hidden">
          <Image
            src={food.photo || imagelink}
            height={600}
            width={900}
            alt="Food Photo"
            className="h-72 object-cover"
          />
        </div>

        <Card className="md:col-span-1 rounded p-2 text-sm max-w-[425px] mx-auto">
          <div className="px-2 py-1 grid grid-cols-5">
            <div className="col-span-2 flex items-center gap-2 border-b  pb-1">
              <Workflow size={12} className="text-sky-600" />
              Source
            </div>
            <div className="col-span-3 border-b pb-1">
              {food.category.category}
            </div>
            <div className="col-span-2 flex items-center gap-2 border-b py-1">
              <CalendarDays size={12} className="text-sky-600" />
              Posted
            </div>
            <div className="col-span-3 border-b py-1">
              {new Date(food.posted_at).toLocaleDateString()}
            </div>
            <div className="col-span-2 flex items-center gap-2  border-b py-1 ">
              <ShieldAlert size={12} className="text-sky-600" />
              Expiry
            </div>
            <div className="col-span-3  border-b py-1">
              {new Date(food.expired_at).toLocaleDateString()}
            </div>
            <div className="col-span-2 flex items-center gap-2  border-b py-1">
              <Calculator size={12} className="text-sky-600" />
              Quantity
            </div>
            <div className="col-span-3  border-b py-1">{food.quantity}</div>
            <div className="col-span-2 flex items-center gap-2  border-b py-1">
              <User size={12} className="text-sky-600" />
              Donor
            </div>
            <div className="col-span-3  border-b py-1">
              {food.posted_by.name}
            </div>
            <div className="col-span-2 flex items-center gap-2 border-b py-1">
              <Phone size={12} className="text-sky-600" />
              Contact
            </div>
            <div className="col-span-3  border-b py-1">
              {food.posted_by.address.phone}
            </div>
            <div className="col-span-2 flex items-center gap-2 pt-1">
              <LocateIcon size={12} className="text-sky-600" />
              Address
            </div>
            <div className="col-span-3 pt-1">
              {food.posted_by.address.location},{" "}
              {food.posted_by.address.post_office},{" "}
              {food.posted_by.address.police_station},{" "}
              {food.posted_by.address.district}, {food.posted_by.address.state},{" "}
              {food.posted_by.address.pin}
            </div>
          </div>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col items-center justify-center mb-6">
        <h3 className="text-lg font-semibold pb-2">Description</h3>
        <p className="text-center text-muted-foreground">{food.description}</p>
      </div>

      <Booking id={food.id} donorId={food.posted_by.id} />
    </div>
  );
}
