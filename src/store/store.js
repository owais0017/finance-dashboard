import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;