"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import ComputerSearch from "@/icons/computer-search";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[425px] pb-2 flex flex-col items-center">
        <div className="h-6 w-6">
          <ComputerSearch />
        </div>
        <Label htmlFor="name" className="text-center pb-2 text-lg font-bold">
          Search Item
        </Label>
        <div className="flex gap-2">
          <Input
            id="name"
            className="min-w-[125px]"
            placeholder="search..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <Button variant={"secondary"}>
            <SearchIcon size={15} className="mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
