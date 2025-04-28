import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("wishlistItems") !== null
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [];

// const totalAmount =
//   localStorage.getItem("totalAmount") !== null
//     ? JSON.parse(localStorage.getItem("totalAmount"))
//     : 0;

// const totalQuantity =
//   localStorage.getItem("totalQuantity") !== null
//     ? JSON.parse(localStorage.getItem("totalQuantity"))
//     : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("wishlistItems", JSON.stringify(item));
//   localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
//   localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
    wishlistItems: items,
//   totalQuantity: totalQuantity,
//   totalAmount: totalAmount,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item.id === newItem.id
      );
      //state.totalQuantity++;

      if (!existingItem) {
        // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene

        state.wishlistItems.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          reference: newItem.reference,
          color: newItem.color?.name,

        //   quantity: 1,
        //   totalPrice: newItem.price,
        });
      }
    //    else {
    //     existingItem.quantity++;
    //     existingItem.totalPrice =
    //       Number(existingItem.totalPrice) + Number(newItem.price);
    //   }

    //   state.totalAmount = state.cartItems.reduce(
    //     (total, item) => total + Number(item.price) * Number(item.quantity),

    //     0
    //   );

      setItemFunc(
        state.wishlistItems.map((item) => item),
        // state.totalAmount,
        // state.totalQuantity
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
     // console.log(action)
      //const id = action.payload;
      // const existingItem = state.wishlistItems.find((item) => item.id === id);
    //   state.totalQuantity--;

    //   if (existingItem.quantity === 1) {
    //     state.cartItems = state.cartItems.filter((item) => item.id !== id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.totalPrice =
    //       Number(existingItem.totalPrice) - Number(existingItem.price);
    //   }

    //   state.totalAmount = state.cartItems.reduce(
    //     (total, item) => total + Number(item.price) * Number(item.quantity),
    //     0
    //   );

      setItemFunc(
        state.wishlistItems.map((item) => item),
        // state.totalAmount,
        // state.totalQuantity
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.wishlistItems.find((item) => item.id === id);

      if (existingItem) {
        state.wishlistItems = state.wishlistItems.filter((item) => item.id !== id);
        //state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

    //   state.totalAmount = state.cartItems.reduce(
    //     (total, item) => total + Number(item.price) * Number(item.quantity),
    //     0
    //   );
      setItemFunc(
        state.wishlistItems.map((item) => item),
        // state.totalAmount,
        // state.totalQuantity
      );
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;