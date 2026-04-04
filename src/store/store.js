import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("financeiq_state");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("financeiq_state", JSON.stringify(state));
  } catch {
    console.error("Could not save state");
  }
};

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    auth: authReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    transactions: store.getState().transactions,
    theme: store.getState().theme,
  });
});

export default store;