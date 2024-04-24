"use client";
import CreateUpdateListing from "@/components/listing-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useCategory from "@/hooks/use-category";
import useUser from "@/hooks/useUser";
import CreateListingIcon from "@/icons/create-listing";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ListingCreatePage() {
  const { user } = useUser();
  const { categories } = useCategory()  

  return (
    <div className="my-8">
      {user && user.address ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="h-12 w-12 mx-auto m-4 ">
              <CreateListingIcon />
            </div>
            <CardTitle className="text-2xl text-slate-700 font-bold">Create food listing</CardTitle>
            <CardDescription className="pb-2">
              Please provide exact info about food and quantity. Be sure to
              check your addres.
            </CardDescription>
            <Separator className="p-1 w-20 bg-pink-500"/>
          </CardHeader>
          <CardContent className="my-4">
            <CreateUpdateListing categories={categories} />
          </CardContent>
        </Card>
      ) : (
        <div className="w-[425px] h-40 flex flex-col items-center justify-center mx-auto my-auto gap-2">
          <p className="text-center">
            You dont have any address. Please create an address before posting
            bounty.
          </p>
            <Link href={`/profile/${user?.id}`} className={cn(buttonVariants({variant: "outline"}))}>
              Go to profile
            </Link>
        </div>
      )}
    </div>
  );
}

