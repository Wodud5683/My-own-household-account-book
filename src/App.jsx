import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from './redux/Store'; // Store 파일의 경로 수정
import ExpenseForm from './components/ExpenseForm';
import MonthSelector from './components/MonthSelector';
import ExpenseList from './components/ExpenseList';
import ExpenseDetail from './pages/ExpenseDetail';
import Home from './pages/Home'; // Home 파일의 경로 수정
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
  return (
    <Provider store={store}>
      <AppWrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home 컴포넌트의 경로 수정 */}
            <Route path="/expense/:id" element={<ExpenseDetail />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </Provider>
  );
};

export default App;
