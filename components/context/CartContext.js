"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Create the context
const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Load cart and shipping address from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      const storedShippingAddress = localStorage.getItem("shippingAddress");

      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }

      if (storedShippingAddress) {
        try {
          const parsedShippingAddress = JSON.parse(storedShippingAddress);
          setShippingAddress(parsedShippingAddress);
        } catch (error) {
          console.error("Failed to parse shipping address:", error);
        }
      }
    }
  }, []);

  // Save cart and shipping address to localStorage whenever they update
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

    const price = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(price);
  }, [cartItems, shippingAddress]);

  // Function to add item to cart
  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
  };

  // Function to update item quantity in the cart
  const updateCartQuantity = (productId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.product._id !== productId));
  };

  // Function to update the shipping address
  const updateShippingAddress = (newAddress) => {
    setShippingAddress(newAddress);
  };

  // Function to update payment method
  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
  };
  // Calculate total quantity of items in the cart
  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        totalQuantity,
        totalPrice,
        shippingAddress,
        updateShippingAddress,
        paymentMethod, // Expose payment method
        updatePaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
