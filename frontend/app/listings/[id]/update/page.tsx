"use client";

import CreateUpdateListing from "@/components/listing-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useCategory from "@/hooks/use-category";
import useFood from "@/hooks/useFood";
import useUser from "@/hooks/useUser";
import CreateListingIcon from "@/icons/create-listing";
import { usePathname } from "next/navigation";

const UpdateListing = () => {
  const { user } = useUser();
  const { categories } = useCategory();
  const id = usePathname().split("/")[2];
  const { item } = useFood(id);

  const formattedExpiredAt = item?.expired_at
    ? new Date(item.expired_at)
    : undefined;

  const data = {
    food_name: item?.food_name || "",
    category: item?.category?.id.toString() || "",
    description: item?.description || "",
    quantity: item?.quantity?.toString() || "",
    expired_at: formattedExpiredAt,
  };

  return (
    <div className="my-8">
      {(user && user.is_staff) ||
      (item && user && user.id === item.posted_by.id) ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="h-12 w-12 mx-auto m-4 ">
              <CreateListingIcon />
            </div>
            <CardTitle className="text-2xl text-slate-700 font-bold">
              Update this item
            </CardTitle>
            <CardDescription className="pb-2">
              Please provide exact info about food and quantity. Be sure to
              check your addres.
            </CardDescription>
            <Separator className="p-1 w-20 bg-pink-500" />
          </CardHeader>
          <CardContent className="my-4">
            <CreateUpdateListing
              categories={categories}
              initialValues={data}
              foodId={item?.id}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="w-[425px] h-full flex items-center justify-center mx-auto my-auto">
          <p className="text-center">
            You dont have permission to accsess this page
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdateListing;
