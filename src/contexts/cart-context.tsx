"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

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
        const currentQuantity = updatedCart[existingProductIndex].quantity;
        updatedCart[existingProductIndex].quantity = currentQuantity + quantity;

        // Ensure quantity doesn't go below 0
        if (updatedCart[existingProductIndex].quantity <= 0) {
          return prevCart.filter((_, index) => index !== existingProductIndex);
        }

        return updatedCart;
      }

      // If product doesn't exist, add it to the cart
      if (quantity > 0) {
        return [...prevCart, { ...product, quantity }];
      }

      return prevCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
