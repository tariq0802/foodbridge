import FoodIcon from "@/icons/food-icon";
import { Card } from "./ui/card";
import HandShake from "@/icons/hand-shake";
import UserConnected from "@/icons/user-connected";
import axios from "axios";
import Medal from "@/icons/medal";

async function getSummary() {
  const response = await axios.get("http://127.0.0.1:8000/api/summary/");
  return response.data;
}

const TopUser = async () => {
  const summary = await getSummary();
  const data = summary.top_users;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-center gap-2">
      {data &&
        data.map((user: any, index: any) => {
          return (
            <Card
              key={index}
              className="flex flex-col items-center justify-between px-4 pb-4 backdrop-blur-md bg-opacity-60 bg-white shadow-md"
            >
              <div className="h-20 w-20 pt-0 mt-0">
                <Medal position={index + 1} />
              </div>
              <h1 className="text-md font-bold">{user.username}</h1>

              <div>
                <p className="sm:text-md text-xs text-muted-foreground">
                  Total Posts:{" "}
                  <span className="text-pink-600">{user.post_count}</span>
                </p>
                <p className="sm:text-md text-xs text-muted-foreground">
                  Items Donated:{" "}
                  <span className="text-sky-600">{user.total_quantity}</span>
                </p>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default TopUser;
