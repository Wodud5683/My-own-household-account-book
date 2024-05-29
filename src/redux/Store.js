import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/ExpensesSlice";

const Store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

export default Store;
