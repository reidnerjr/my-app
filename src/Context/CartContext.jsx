import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; // Importa sua api

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [stock, setStock] = useState({});
  const [products, setProducts] = useState([]);

  // Carrega produtos ao iniciar
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/products'); // endpoint da sua API
        const productsData = response.data;

        setProducts(productsData);

        const initialStock = {};
        productsData.forEach((product) => {
          initialStock[product.id] = product.quantity;
        });
        setStock(initialStock);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    loadProducts();
  }, []);

  const addToCart = (product) => {
    if (stock[product.id] <= 0) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

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
        products, // se quiser usar os produtos em outros componentes
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
