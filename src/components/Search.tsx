import { Search } from "lucide-react";
import React from "react";
import Input from "./UI/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search trucks or drivers..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};
