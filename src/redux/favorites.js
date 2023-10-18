import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
  // carts : []
};

const favorites = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, data) => {
      state.favorites = data.payload;
    },
  },
});

export const { setFavorites } = favorites.actions;

export default favorites.reducer;
