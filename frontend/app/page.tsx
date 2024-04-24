import ListingCard from "@/components/listing-card";
import ListingPagination from "@/components/pagination";
import Search from "@/components/search";
import TopUser from "@/components/top-user";
import { Separator } from "@/components/ui/separator";
import Medal from "@/icons/medal";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

async function getFoods(query: string, currentPage: number) {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/foods?query=${query}&page=${currentPage}`
  );
  return response.data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const ITEM_PER_PAGE = 8;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const foods = await getFoods(query, currentPage);
  const totalPages = Math.ceil(Number(foods.count) / ITEM_PER_PAGE);

  return (
    <main className="flex flex-col gap-4 my-8">

      <div className="space-y-4">
        <Search />
        <Suspense fallback={<Loader2 />}>
          <ListingCard foods={foods} />
        </Suspense>
        <ListingPagination totalPages={totalPages} />
      </div>
      <Separator/>

      <div className="mt-4">
        <h1 className="text-xl font-bold text-center mb-6">Top Contrubuters</h1>
        <TopUser/>
      </div>
    </main>
  );
}
