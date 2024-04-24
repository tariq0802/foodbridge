import getImage from "@/actions/get-image";
import { Food } from "@/types/types";
import { MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ListingCard {
  foods: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Food[];
  };
}

const ListingCard: React.FC<ListingCard> = ({ foods }) => {
  return (
    <>
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 space-y-4 sm:space-y-0 sm:gap-4">
        {foods &&
          foods.results.map((food) => {
            const imageLink = getImage();
            return (
              <div key={food.id} className="p-4 border shadow ">
                <Link href={`/listings/${food.id}`}>
                  <div className="grid grid-cols-12 ">
                    <div className="col-span-9">
                      <div className="text-lg font-semibold text-slate-700">
                        {food.food_name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        <div className="flex items-center gap-2">
                          <User size={12} />
                          <p>{food.posted_by.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} />
                          <p>
                            {food.posted_by.address.police_station},{" "}
                            {food.posted_by.address.district}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <Image
                        src={food.photo || imageLink}
                        height={200}
                        width={250}
                        alt="Food Picture"
                        className="w-full h-16 object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-sm py-4 h-14 overflow-hidden">
                    {food.description}
                  </p>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ListingCard;
