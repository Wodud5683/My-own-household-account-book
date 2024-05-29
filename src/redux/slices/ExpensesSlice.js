import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import fakeData from "../../fakeData.json";

const initialState = {
  expenses: fakeData,
  selectedMonth: "1월",
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({ id: uuidv4(), ...action.payload });
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { addExpense, deleteExpense, updateExpense, setSelectedMonth } =
  expensesSlice.actions;
export default expensesSlice.reducer;
