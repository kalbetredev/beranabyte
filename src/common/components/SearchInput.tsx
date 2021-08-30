import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface SearchInputProps {
  searchOnInput: boolean;
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const placeholder = props.placeholder ?? "Search";
  const [searchInput, setSearchInput] = useState("");

  const handelInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    setSearchInput(value);
    if (props.searchOnInput) props.onSearch(value);
  };

  const onSearch = (event: React.KeyboardEvent) => {
    if ((event as React.KeyboardEvent).key === "Enter") {
      props.onSearch(searchInput);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon className="w-5 h-5 text-gray-300" />
      </div>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={searchInput}
        onInput={handelInputChange}
        onKeyUp={onSearch}
        className="outline-none pl-8 bg-transparent text-sm w-full sm:w-72 border rounded-md flex justify-center items-center p-[6px] border-gray-400 border-opacity-25 focus:ring-1 ring-brand ring-opacity-50"
      />
    </div>
  );
};

export default SearchInput;
