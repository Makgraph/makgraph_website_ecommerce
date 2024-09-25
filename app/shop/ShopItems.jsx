"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "@components/LoadingSpinner";
import Message from "@components/ErrorMessage";
import PaginationShop from "./PaginationShop";

const ShopItems = ({ products, loading, error, page, pages, setPage }) => {
  // État local pour afficher ou masquer le sélecteur de quantité
  const [showQuantitySelector, setShowQuantitySelector] = useState({});

  // Fonction pour gérer l'affichage du sélecteur de quantité
  const handleToggleQuantitySelector = (productId) => {
    setShowQuantitySelector((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div>
      {error && (
        <Message variant="bg-danger dark:bg-danger-dark text-white">
          {error}
        </Message>
      )}

      {loading ? (
        <div className="flex min-h-[312.4px] justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="gap-10 md:gap-10 min-h-[312.4px] justify-items-center items-center justify-center grid md:grid-cols-4 grid-cols-2">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard
                product={product}
                isQuantitySelectorVisible={showQuantitySelector[product._id]}
                onToggleQuantitySelector={handleToggleQuantitySelector}
              />
            </div>
          ))}
        </div>
      )}
      {/* Pagination component */}
      <PaginationShop pages={pages} page={page} setPage={setPage} />
    </div>
  );
};

export default ShopItems;
