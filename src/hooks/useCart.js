import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cart";

export default function useCart() {
  const carts = useSelector((state) => state?.cart?.carts);
  const dispatch = useDispatch();

  const addToCart = (cart) => {
    const overallCarts = [...carts, cart];
    dispatch(setCart(overallCarts));
  };

  const removeFromCart = (id) => {
    dispatch(setCart(carts.filter(e => e.id !== id)));
  };
  
  const isInCart = (id) => carts.find(e => e?.id === id) ? true : false

  React.useEffect(() => {
    if (carts) localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  return {
    carts,
    addToCart,
    removeFromCart,
    isInCart
  };
}
