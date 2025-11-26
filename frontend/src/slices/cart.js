import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { userId, items: [...] }
});

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/cart/add`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data; // { userId, items: [...] }
  }
);

// Update item quantity
export const updateCart = createAsyncThunk("cart/update", async ({ productId, quantity }) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/cart/update`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data; // Make sure backend returns full cart
});
// Remove item
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/cart/remove/${productId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data; // return updated cart { userId, items: [...] }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []; // full cart items
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []; // full cart items
      })
        },
});

export default cartSlice.reducer;
