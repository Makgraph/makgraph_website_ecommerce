"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const fetchAllItems = () => {
    setKeyword(""); // Reset the search keyword to an empty string
    setPageNumber(1);
  };
  
  return (
    <SearchContext.Provider
      value={{ keyword, setKeyword, pageNumber, setPageNumber, fetchAllItems }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
