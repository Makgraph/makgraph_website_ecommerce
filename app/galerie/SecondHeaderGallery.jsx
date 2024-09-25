"use client";

import { useRouter } from "next/navigation";

const SecondHeaderGallery = ({ category, setCategory }) => {
  const router = useRouter();

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);

    // Construire l'URL correctement
    const url =
      newCategory === "All Categories"
        ? "/galerie"
        : `/galerie/category/${encodeURIComponent(newCategory)}`;

    router.push(url); // Utiliser router.push au lieu de navigate
  };

  return (
    <div className="bg-white border border-[#d4d6d8] py-2 sm:py-2 px-4 sm:px-2 sm:gap-4 md:gap-20 sm:flex sm:justify-between sm:items-center relative">
      <div className="flex gap-3 sm:gap-4 items-center">
        {/* Selecteur de catégories */}
        <div className="relative flex items-center">
          <label htmlFor="category-select" className="sr-only">
            Select Category
          </label>
          <select
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            className="bg-white border border-[#d1d5db] font-serif rounded-sm py-2 px-4 text-sm sm:text-base outline-none focus:border-primary focus:ring-2 focus:ring-[#d1d5dcb] focus:ring-opacity-50"
          >
            <option value="All Categories" className="font-serif">
              All Categories
            </option>
            <option value="image" className="font-serif">
              Image
            </option>
            <option value="video" className="font-serif">
              Video
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SecondHeaderGallery;
