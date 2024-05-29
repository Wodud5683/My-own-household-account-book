import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import store from "./redux/Store";
import Home from "./pages/Home";
import ExpenseDetail from "./pages/ExpenseDetail";

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
            <Route path="/" element={<Home />} />
            <Route path="/expense/:id" element={<ExpenseDetail />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </Provider>
  );
};

export default App;
