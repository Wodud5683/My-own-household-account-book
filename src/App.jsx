import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import fakeData from './fakeData.json';
import ExpenseForm from './components/ExpenseForm';
import MonthSelector from './components/MonthSelector';
import ExpenseList from './components/ExpenseList';
import ExpenseDetail from './pages/ExpenseDetail';
import GlobalStyles from './GlobalStyles'; 

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #E9F7F6;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App = () => {
  const [expenses, setExpenses] = useState(fakeData);
  const [selectedMonth, setSelectedMonth] = useState('1월');

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  useEffect(() => {
    const savedMonth = localStorage.getItem('selectedMonth');
    if (savedMonth) {
      setSelectedMonth(savedMonth);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedMonth', selectedMonth);
  }, [selectedMonth]);

  const filteredExpenses = expenses.filter(expense => {
    const expenseMonth = new Date(expense.date).getMonth() + 1;
    return expenseMonth === parseInt(selectedMonth);
  });

  return (
    <AppWrapper>
      <GlobalStyles /> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Container>
                <ExpenseForm addExpense={addExpense} />
              </Container>
              <Container>
                <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
              </Container>
              <Container>
                <ExpenseList expenses={filteredExpenses} />
              </Container>
            </>
          } />
          <Route path="/expense/:id" element={<ExpenseDetail expenses={expenses} setExpenses={setExpenses} />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
};

export default App;
