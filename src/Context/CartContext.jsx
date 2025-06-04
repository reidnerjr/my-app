import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [stock, setStock] = useState({
    1: 5, // id: quantidade disponível
    2: 3,
    3: 10,
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (stock[product.id] <= 0) return prevCart;

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setStock((prev) => ({
      ...prev,
      [product.id]: prev[product.id] - 1,
    }));
  };

  const removeFromCart = (id) => {
    const removed = cart.find((item) => item.id === id);
    if (removed) {
      setStock((prev) => ({
        ...prev,
        [id]: prev[id] + removed.quantity,
      }));
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id) => {
    if (stock[id] <= 0) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    setStock((prev) => ({
      ...prev,
      [id]: prev[id] - 1,
    }));
  };

  const decrementQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      setStock((prev) => ({
        ...prev,
        [id]: prev[id] + 1,
      }));
    }
  };

  const clearCart = () => {
    cart.forEach((item) => {
      setStock((prev) => ({
        ...prev,
        [item.id]: prev[item.id] + item.quantity,
      }));
    });
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        stock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
