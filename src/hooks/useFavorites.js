import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../redux/favorites";

export default function useFavorites() {
  const favorites = useSelector((state) => state?.favorites?.favorites);
  const dispatch = useDispatch();

  const addToFavorites = (id) => {
    const fav = [...favorites, id];
    dispatch(setFavorites(fav));
  };

  const removeFavorite = (id) => {
    dispatch(setFavorites(favorites?.filter((e) => e !== id)));
  };

  const IfFavorite = (id) => (favorites.find((e) => e === id) ? true : false);

  React.useEffect(() => {
    if (favorites) localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFavorite,
    ifFavorite : IfFavorite,
  };
}
