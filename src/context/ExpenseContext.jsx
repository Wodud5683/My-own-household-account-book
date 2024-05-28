import { createContext, useState, useEffect } from 'react';
import fakeData from '../fakeData.json';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(fakeData);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const savedMonth = localStorage.getItem('selectedMonth');
    return savedMonth ? savedMonth : '1월';
  });

  useEffect(() => {
    localStorage.setItem('selectedMonth', selectedMonth);
  }, [selectedMonth]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseMonth = new Date(expense.date).getMonth() + 1;
    return expenseMonth === parseInt(selectedMonth);
  });

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, selectedMonth, setSelectedMonth, addExpense, filteredExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
