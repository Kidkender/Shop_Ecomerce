import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartSlice from "./slice/cartSlice";
import filterSlice from "./slice/filterSlice";
import orderSlice from "./slice/orderSlice";
import productSlice from "./slice/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productSlice,
  filter: filterSlice,
  order: orderSlice,
  cart: cartSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
