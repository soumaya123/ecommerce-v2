import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import wishlistSlice from "./wislist/wishlistSlice";
import wishlistUiSlice from "./wislist/wishlistUiSlice";

const store = configureStore( {
    reducer: {
        cart: cartSlice.reducer,
        cartUi: cartUiSlice.reducer,
        wishlist: wishlistSlice.reducer,
        wishlistUi: wishlistUiSlice.reducer,
    }
} )

export default store;




