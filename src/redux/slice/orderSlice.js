import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDER(state, action) {
      state.orderHistory = action.payload;
    },
    CALC_TOTAL_ORDERS_AMOUNT(state, action) {
      console.log("order history", action.payload.orderHistory);
      let array_order_amount = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;
        array_order_amount.push(orderAmount);
      });
      state.totalOrderAmount = array_order_amount;
    },
  },
});

export const { STORE_ORDER, CALC_TOTAL_ORDERS_AMOUNT } = orderSlice.actions;

export const selectOrderHistory = (state) => state.orders.orderHistory;

export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer;
