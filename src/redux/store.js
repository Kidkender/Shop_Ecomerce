import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productSlice,
  filter: filterSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
