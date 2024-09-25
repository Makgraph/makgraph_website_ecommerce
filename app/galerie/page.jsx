"use client";

import { useEffect, useState } from "react";
import Footer from "@components/Footer";
import SecondHeaderGallery from "./SecondHeaderGallery";
import Categorie from "./Categorie";
import PaginationGalery from "./PaginationGallery";
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
          throw new Error("Erreur lors de la récupération des éléments");
        }
        const data = await response.json();
        console.log(data); // Check the structure of the data
        setItems(data.items || []);
        setPages(data.totalPages || 0);
      } catch (error) {
        console.error(error); // Log any errors
      } finally {
        setLoading(false); // Always set loading to false at the end
      }
    };

    fetchItems();
  }, [page, keyword, category]);

  return (
    <div>
      <div className="p-screen pt-16 sm:pt-20 md:pt-28">
        <div className="w-[100%] flex justify-center items-center py-2 md:py-4">
          <div className="flex justify-center">
            <h2 className="text-[20px] font-serif font-medium md:text-[28px]">
              Galerie
            </h2>
          </div>
        </div>

        <div>
          <SecondHeaderGallery
            keyword={keyword}
            setKeyword={setKeyword}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="relative">
          <div className="pt-4">
            {loading ? ( // Render loading spinner if loading
              <div className="flex justify-center items-center min-h-[249.83px]">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="justify-items-center items-center grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {items.map((item) => (
                  <Categorie key={item._id} categorie={item} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[96px]">
          <PaginationGalery page={page} pages={pages} setPage={setPage} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default GalleryScreen;
