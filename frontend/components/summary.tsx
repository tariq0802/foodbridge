
import FoodIcon from "@/icons/food-icon";
import { Card } from "./ui/card";
import HandShake from "@/icons/hand-shake";
import UserConnected from "@/icons/user-connected";
import axios from "axios";

async function getSummary() {
  const response = await axios.get('http://127.0.0.1:8000/api/summary/')
  return response.data
}
const Summary = async () => {
  const summary = await getSummary()  
  
  return (
    <div className="flex justify-center text-center gap-4 sm:gap-8">
      <Card className="flex flex-col items-center justify-center p-4 pb-4 backdrop-blur-md bg-opacity-60 bg-white shadow-md">
        <div className="h-8 w-8">
          <FoodIcon />
        </div>
        <h1 className="sm:text-2xl text-xl font-bold">
          {summary.total_food_quantity}
        </h1>
        <p className="sm:text-md text-xs text-muted-foreground">
          individual food served
        </p>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 pb-4 backdrop-blur-md bg-opacity-60 bg-white shadow-md">
        <div className="h-8 w-8">
          <HandShake />
        </div>
        <h1 className="sm:text-2xl text-xl font-bold">{summary.order_count}</h1>
        <p className="sm:text-md text-xs text-muted-foreground">
          Total person got help
        </p>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 pb-4 backdrop-blur-md bg-opacity-60 bg-white shadow-md">
        <div className="h-8 w-8">
          <UserConnected />
        </div>
        <h1 className="sm:text-2xl text-xl font-bold">{summary.user_count}</h1>
        <p className="sm:text-md text-xs text-muted-foreground">
          Total people connected
        </p>
      </Card>
    </div>
  );
};

export default Summary;
