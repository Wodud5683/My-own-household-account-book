import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { ExpenseProvider } from './context/ExpenseContext';
import Home from './pages/Home';
import ExpenseDetail from './pages/ExpenseDetail';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App = () => {
  return (
    <ExpenseProvider>
      <AppWrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expense/:id" element={<ExpenseDetail />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </ExpenseProvider>
  );
};

export default App;
