import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            // Check if the item already exists in the cart
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                // Increment quantity if the item already exists
                existingItem.quantity += 1;
            } else {
                // Add new item to the cart with an initial quantity of 1
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteFromCart(state, action) {
            return state.filter((item) => item.id !== action.payload.id);
        },
        incrementQuantity(state, action) {
            // Find the item to increment its quantity
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decrementQuantity(state, action) {
            // Find the item to decrement its quantity
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; // Decrement only if quantity > 1
                } else {
                    // Remove item if quantity reaches 1 and decrement is called
                    return state.filter((item) => item.id !== action.payload.id);
                }
            }
        },
    },
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
