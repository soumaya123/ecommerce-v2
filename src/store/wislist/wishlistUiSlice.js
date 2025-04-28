import { createSlice } from "@reduxjs/toolkit";

const wishlistUiSlice = createSlice({
    name: 'wishlistUi',
    initialState: { wishlistIsVisible: false },
    reducers: {
        toggle ( state )
        {
            state.wishlistIsVisible= !state.wishlistIsVisible;
        }
    }
} );

export const wishlistUiActions = wishlistUiSlice.actions;
export default wishlistUiSlice;