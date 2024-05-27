import React, { createContext, useState, useContext } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('1월');

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, selectedMonth, setSelectedMonth }}>
      {children}
    </ExpenseContext.Provider>
  );
};
