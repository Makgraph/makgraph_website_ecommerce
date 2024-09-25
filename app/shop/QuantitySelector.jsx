"use client";

import { useState } from "react";
import { useCart } from "../../components/context/CartContext";

const QuantitySelector = ({ product, showQuantitySelector }) => {
  const { cartItems, addToCart } = useCart();
  const existingItem = cartItems.find(
    (item) => item.product._id === product._id
  );
  const [currentQuantity, setCurrentQuantity] = useState(
    existingItem ? existingItem.quantity : 1
  );

  // Gérer le changement de quantité
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (existingItem) {
      // Update the quantity of an existing product in the cart
      addToCart(product, newQuantity - existingItem.quantity);
      // addToCart(product, newQuantity);
    } else {
      // Add new product to the cart
      addToCart(product, newQuantity);
    }
    // if (existingItem) {
    //   // Mettre à jour la quantité si le produit est déjà dans le panier
    //   dispatch(
    //     updateCartQuantity({ productId: product._id, quantity: newQuantity })
    //   );
    // } else {
    //   // Ajouter le produit au panier
    //   dispatch(addToCart({ product, quantity: newQuantity }));
    // }

    setCurrentQuantity(newQuantity);
  };

  // Afficher le sélecteur uniquement si showQuantitySelector est true
  return showQuantitySelector ? (
    <select
      aria-label="Quantité"
      className="bg-[#cbd5e1] w-full h-8"
      value={currentQuantity}
      onChange={handleQuantityChange}
    >
      {[...Array(product.countInStock).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </select>
  ) : null;
};

export default QuantitySelector;
