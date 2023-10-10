import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carts : localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) :  []
    // carts : []
}

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart : (state, data) => {
        state.carts = data.payload
    }
  }
});

export const { setCart } = cart.actions

export default cart.reducer