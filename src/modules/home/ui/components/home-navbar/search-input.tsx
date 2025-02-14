import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  // TODO: Add search functionality

  return (
    <form className="flex w-full max-w-screen-sm">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-primary transition-all duration-300"
        />
        {/* TODO: Add remove search button  */}
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 border border-l-0 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-primary"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
export default SearchInput;
