"use client";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL("/search", APP_URL);
    const newQuery = value.trim();

    url.searchParams.set("query", encodeURIComponent(newQuery));

    if (newQuery === "") {
      url.searchParams.delete("query");
    }

    setValue(newQuery);
    router.push(url.toString());
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-screen-sm">
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full pl-2 sm:pl-4 py-1 sm:py-2 pr-2 sm:pr-12 rounded-l-full border focus:outline-none focus:border-primary transition-all duration-300"
        />

        {value && (
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
          >
            <XIcon className="text-foreground/50" />
          </Button>
        )}
      </div>
      <button
        disabled={!value.trim()}
        type="submit"
        className="px-2 sm:px-4 py-1.5 sm:py-2.5 border border-l-0 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
export default SearchInput;
