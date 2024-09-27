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

  // Load cart, shipping address, and payment method from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      const storedShippingAddress = localStorage.getItem("shippingAddress");
      const storedPaymentMethod = localStorage.getItem("paymentMethod");

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
          setShippingAddress(
            parsedShippingAddress || {
              address: "",
              city: "",
              postalCode: "",
              country: "",
            }
          );
        } catch (error) {
          console.error(
            "Failed to parse shipping address from localStorage:",
            error
          );
        }
      }

      if (storedPaymentMethod) {
        setPaymentMethod(storedPaymentMethod);
      }
    }
  }, []);

  // Save cart, shipping address, and payment method to localStorage whenever they update
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

    // Only save shipping address if it contains non-empty values
    if (
      shippingAddress?.address ||
      shippingAddress?.city ||
      shippingAddress?.postalCode ||
      shippingAddress?.country
    ) {
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    } else {
      localStorage.removeItem("shippingAddress");
    }

    if (paymentMethod) {
      localStorage.setItem("paymentMethod", paymentMethod);
    } else {
      localStorage.removeItem("paymentMethod");
    }

    const price = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(price);
  }, [cartItems, shippingAddress, paymentMethod]);

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

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
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
        clearCart,
        totalQuantity,
        totalPrice,
        shippingAddress,
        updateShippingAddress,
        paymentMethod,
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
