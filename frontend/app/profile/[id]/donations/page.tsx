import { DataTable } from "@/components/data-table";
import axios from "axios";
import { donationColumns } from "../components/donation-columns";

async function getFoodsByUser(id: number) {
    const response = await axios.get(`http://127.0.0.1:8000/api/foods/?user=${id}`);
    return response.data;
}

export default async function DonationPage({ params }: { params: { id: number } }) {
    const { id } = params
    const foods = await getFoodsByUser(id)
    
  return <div><DataTable columns={donationColumns} data={foods.results} column_name="food_name"/></div>;
}
