"use client";

import { useEffect, useState } from "react";
import NavBarShop from "./NavBarShop.jsx";
import ShopItems from "./ShopItems";
import Footer from "@components/Footer.jsx";
import { useSearch } from "@components/context/SearchContext";

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null);
  const { keyword, setKeyword, setPageNumber } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/shop?pageNumber=${page}&keyword=${keyword}&sizes=&colors=`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.pages);
        setError(null); // Reset error if successful
      } catch (error) {
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, keyword]);

  useEffect(() => {
    // This will set the page back to 1 whenever the keyword changes
    setPage(1);
    setPageNumber(1); // Update the context when keyword changes
  }, [keyword, setPageNumber]);

  return (
    <div>
      <div className="p-screen pt-16 sm:pt-20 md:pt-28">
        <NavBarShop />
        <ShopItems
          loading={loading}
          error={error}
          products={products}
          page={page}
          pages={totalPages}
          setPage={setPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ShopScreen;
