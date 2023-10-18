import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter";
import cartSlice from "./cart";
import favorites from "./favorites";

export default configureStore({
  reducer: {
    cart : cartSlice,
    favorites : favorites
  },
});
