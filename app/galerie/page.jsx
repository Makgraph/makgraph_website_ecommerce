"use client";

import { useEffect, useState } from "react";
import Footer from "@components/Footer";
import SecondHeaderGallery from "./SecondHeaderGallery";
import Categorie from "./Categorie";
import PaginationGallery from "./PaginationGallery";
import LoadingSpinner from "@components/LoadingSpinner";

const GalleryScreen = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/gallery?pageNumber=${page}&keyword=${keyword}&category=${category}`
        );
        if (!response.ok) {
          throw new Error("Error fetching items");
        }
        const data = await response.json();
        console.log(data); // Check data structure
        setItems(data.items || []);
        setPages(data.totalPages || 0);
      } catch (error) {
        console.error("Fetch error:", error); // Improved error logging
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page, keyword, category]);

  return (
    <div>
      <div className="p-screen pt-16 sm:pt-20 md:pt-28">
        <div className="flex justify-center py-2 md:py-4">
          <h2 className="text-[20px] font-serif font-medium md:text-[28px]">
            Galerie
          </h2>
        </div>

        <SecondHeaderGallery
          keyword={keyword}
          setKeyword={setKeyword}
          category={category}
          setCategory={setCategory}
        />

        <div className="relative pt-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[249.83px]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {items.map((item) => (
                <Categorie key={item._id} categorie={item} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center min-h-[96px]">
          <PaginationGallery page={page} pages={pages} setPage={setPage} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryScreen;
