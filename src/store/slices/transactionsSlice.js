import { createSlice } from "@reduxjs/toolkit";
import { transactions } from "../../data/mockData";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: transactions,
    filterType: "all",
    filterCategory: "all",
    searchQuery: "",
    sortBy: "date",
    sortOrder: "desc",
  },
  reducers: {
    addTransaction: (state, action) => {
      state.items.push(action.payload);
    },
    editTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  addTransaction, editTransaction, deleteTransaction,
  setFilterType, setFilterCategory, setSearchQuery,
  setSortBy, setSortOrder,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;