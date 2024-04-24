"use client";

import Login from "@/components/login";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAddress from "@/hooks/use-address";
import useUser from "@/hooks/useUser";
import ProfileIcon from "@/icons/profile-icon";
import AddressForm from "./components/address-form";

const ProfilePage = () => {
  const { address } = useAddress();
  const { user } = useUser();

  return (
    <Card className="max-w-[425px] mx-auto p-8">
      <div className="w-28 mx-auto">
        <ProfileIcon />
      </div>
      <h1 className="text-2xl font-bold text-center mt-4">{user?.name}</h1>
      <p className="text-center">{user?.email}</p>
      {user?.date_joined && (
        <p className="text-center">
          Joined on: {new Date(user.date_joined).toLocaleDateString()}
        </p>
      )}

      {user ? (
        <>
          <h2 className="text-center mt-8 mb-3 text-lg font-semibold">
            Adress
          </h2>
          <div className=" border-2 rounded-lg p-4">
            <div className="grid grid-cols-2 border-b pb-1">
              <p className="font-medium">Village / Street</p>
              <p className=" text-muted-foreground">{address?.location}</p>
            </div>
            <div className="grid grid-cols-2 border-b py-1">
              <p className="font-medium">Post Office</p>
              <p className=" text-muted-foreground">{address?.post_office}</p>
            </div>
            <div className="grid grid-cols-2 border-b py-1">
              <p className="font-medium">Police Station</p>
              <p className=" text-muted-foreground">{address?.police_station}</p>
            </div>
            <div className="grid grid-cols-2 border-b py-1">
              <p className="font-medium">District</p>
              <p className=" text-muted-foreground">{address?.district}</p>
            </div>
            <div className="grid grid-cols-2 border-b py-1">
              <p className="font-medium">PIN Code</p>
              <p className=" text-muted-foreground">{address?.pin}</p>
            </div>
            <div className="grid grid-cols-2 py-1">
              <p className="font-medium">Phone No</p>
              <p className=" text-muted-foreground">{address?.phone}</p>
            </div>

            <div className="w-full h-16 flex justify-center items-center">
              <AddressForm />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-12 flex justify-center items-center">
          <Login />
        </div>
      )}
    </Card>
  );
};

export default ProfilePage;
