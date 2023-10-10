import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter";
import cartSlice from "./cart";

export default configureStore({
  reducer: {
    cart : cartSlice
  },
});
