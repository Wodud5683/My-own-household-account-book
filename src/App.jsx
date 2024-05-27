import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseDetail from './pages/ExpenseDetail';
import { ExpenseProvider } from './context/ExpenseContext';
import GlobalStyle from './GlobalStyles';

const App = () => {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ExpenseForm />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expense/:id" element={<ExpenseDetail />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
};

export default App;
