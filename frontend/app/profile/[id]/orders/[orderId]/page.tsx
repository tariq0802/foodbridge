"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useOrder from "@/hooks/useOrder";
import useUser from "@/hooks/useUser";
import Approved from "@/icons/approved";
import Ticket from "@/icons/ticket";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IParams {
  id: string;
  orderId: string;
}

const TicketPage = ({ params }: { params: IParams }) => {
  const { orderId } = params;
  const { user } = useUser();
  const { order } = useOrder(orderId);

  return (
    <div>
      {user && user.id === order?.user.id ? (
        <Card className="max-w-[375px] mx-auto" id="print-area">
          <CardHeader className="flex items-center">
            <div className="h-24 w-24">
              <Ticket />
            </div>
          </CardHeader>
          <CardContent className="relative flex flex-col justify-center items-center">
            <h1 className="text-3xl font-extrabold">{order.user.name}</h1>
            <p
              className="text-muted-foreground
              "
            >
              {order.user.address.location}, {order.user.address.post_office},{" "}
              {order.user.address.district}
            </p>
            <div className="text-center my-6 font-bold text-xl">
              <p>{new Date(order.updated_at).toLocaleDateString()}</p>
              <p>{order.item.food.food_name}</p>
              <p>Quantity: {order.item.quantity}</p>
            </div>
            <div className="absolute opacity-30 -rotate-12">
              <Approved />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                setTimeout(() => window.print(), 100);
              }}
              size={"sm"}
              variant={"secondary"}
              className="ml-auto bg-sky-400"
            >
              Print
            </Button>
            <Link
              href={`/profile/${user.id}/orders`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "ml-2"
              )}
            >
              Back
            </Link>
          </CardFooter>
        </Card>
      ) : null}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area,
          #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TicketPage;
