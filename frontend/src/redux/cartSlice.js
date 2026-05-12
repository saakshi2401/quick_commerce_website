import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        // If qty is provided explicitly, it replaces. Otherwise it adds 1.
        state.cartItems = state.cartItems.map(x =>
          x.product === existItem.product ? { ...x, qty: item.qty || x.qty + 1 } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, qty: item.qty || 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existItem = state.cartItems.find(x => x.product === id);
      if (existItem) {
        if (existItem.qty === 1) {
          state.cartItems = state.cartItems.filter(x => x.product !== id);
        } else {
          state.cartItems = state.cartItems.map(x =>
            x.product === id ? { ...x, qty: x.qty - 1 } : x
          );
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
