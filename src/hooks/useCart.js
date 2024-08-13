import { useEffect, useMemo, useState } from "react";

import { db } from "../data/db-guitar";

export const useCart = () => {
  // const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    //find - retorna el primer elemento que cumple con la condición || si no existe retorna undefined
    //Retorna la posición del elemento en el array || si no existe retorna -1
    const itemExists = cart.findIndex((idCart) => idCart.id === item.id);

    if (itemExists >= 0) {
      console.log("El producto ya existe en el carrito");
      const updateCart = [...cart];
      updateCart[itemExists].cantidad++;
      setCart(updateCart);
    } else {
      console.log("El producto no existe en el carrito");

      item.cantidad = 1;
      // setCart((prevCart) => [...prevCart, item]);
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    // const updateCart = cart.filter( guitar => guitar.id !== id);
    // setCart(updateCart);

    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const increaseQuantity = (id) => {
    // console.log("Aumentar cantidad", id);
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.cantidad < MAX_ITEMS) {
        return {
          ...guitar,
          cantidad: guitar.cantidad + 1,
        };
      }
      return guitar;
    });
    setCart(updateCart);
  };

  const decreaseQuantity = (id) => {
    // console.log("Disminuir cantidad", id);
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.cantidad > MIN_ITEMS) {
        return {
          ...guitar,
          cantidad: guitar.cantidad - 1,
        };
      }
      return guitar;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // const saveLocalStorage = () => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }


  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.cantidad), 0), [cart])


  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal

  };
};

// export default useCart;

// export {
//   useCart
// }
