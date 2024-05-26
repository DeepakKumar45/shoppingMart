import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    quantity: number;
    productName: string
}

interface CartState {
    items: Record<string, CartItem>;
}

const initialState: CartState = {
    items: {},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ productId: string; productName: string; quantity?: number, item?: any }>) => {
            const { productId, productName, quantity = 1, item } = action.payload;
            if (state.items[productId]) {
                state.items[productId].quantity += quantity;
            } else {
                state.items[productId] = { quantity, productName, item };
            }
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.items[productId].quantity += 1;
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.items[productId].quantity -= 1;
                if (state.items[productId].quantity < 1) {
                    delete state.items[productId];
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            delete state.items[productId];
        },
        clearCart: (state) => {
            state.items = {};
        },
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, addToCart1 } = cartSlice.actions;

export default cartSlice.reducer;