// src/redux/actions/expenses.js

export const AddExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  payload: id,
});
