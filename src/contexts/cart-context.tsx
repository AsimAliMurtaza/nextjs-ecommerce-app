'use client';
// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of the product in the cart
interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the context
interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: CartProduct, quantity: number) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex > -1) {
        // Update quantity if product already exists
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
