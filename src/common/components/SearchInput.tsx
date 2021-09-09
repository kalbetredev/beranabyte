import React, { useRef, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/solid";

interface SearchInputProps {
  searchOnInput: boolean;
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const placeholder = props.placeholder ?? "Search";
  const [searchInput, setSearchInput] = useState("");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);

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

  const clearSearch = () => {
    setSearchInput("");
    props.onSearch("");
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full sm:w-72">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon
          className={
            "w-5 h-5 " +
            (focus
              ? "text-brand text-opacity-30 dark:text-opacity-100"
              : "text-gray-300")
          }
        />
      </div>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={searchInput}
        onInput={handelInputChange}
        onKeyUp={onSearch}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={inputRef}
        className="outline-none pl-8 pr-8 bg-transparent text-sm w-full border rounded-md flex justify-center items-center p-[6px] border-gray-400 border-opacity-25 focus:border-brand focus:border-opacity-25 focus:ring-brand focus:ring-opacity-50"
      />
      <div className="absolute pr-2 inset-y-0 right-0 flex items-center">
        <button
          onClick={() => clearSearch()}
          className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-center items-center"
        >
          <XIcon className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
