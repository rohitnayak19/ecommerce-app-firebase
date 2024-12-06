import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import the reducer (default export)

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Assign the reducer to the cart slice
    },
});
