import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotallQuantity: 0,
  cartTotalAmount: 0,
  previousURL: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartTotallQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartTotallQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_TO_CART(state, action) {
      const id = action.payload.id;
      const productIndex = state.cartItems.findIndex((item) => item.id === id);
      if (state.cartItems[productIndex].cartTotallQuantity > 1) {
        state.cartItems[productIndex].cartTotallQuantity -= 1;
        toast.info(`${action.payload.name} decreased by one`, {
          position: "top-right",
        });
      } else if (state.cartItems[productIndex].cartTotallQuantity == 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== id
        );
        toast.success(`${action.payload.name} removed to cart`, {
          position: "top-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_ITEM_CART(state, action) {
      const newItemCart = state.cartItems.filter(
        (itemCart) => itemCart.id !== action.payload.id
      );
      toast.success(`${action.payload.name} removed success`, {
        position: "top-right",
      });
      localStorage.setItem("cartItems", JSON.stringify(newItemCart));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success("Clear cart success", { position: "top-right" });
      localStorage.setItem("cartItems", JSON.stringify());
    },

    CALCULATE_SUBTOTAL(state, action) {
      const array_item_amount_cart = [];

      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array_item_amount_cart.push(cartItemAmount);
      });

      const totalAmount = array_item_amount_cart.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array_item_quantity = [];

      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array_item_quantity.push(quantity);
      });

      const total_quantity = array_item_quantity.map((prev, current) => {
        return prev + current;
      }, 0);

      state.cartTotallQuantity = total_quantity;
    },

    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  DECREASE_TO_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantities = (state) =>
  state.cart.cartTotallQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
