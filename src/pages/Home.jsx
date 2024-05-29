import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import MonthSelector from "../components/MonthSelector";
import ExpenseList from "../components/ExpenseList";
import { setSelectedMonth } from "../redux/slices/ExpensesSlice";

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e9f7f6;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { expenses, selectedMonth } = useSelector((state) => state.expenses);

  return (
    <Container>
      <ExpenseForm />
      <MonthSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={(month) => dispatch(setSelectedMonth(month))}
      />
      <ExpenseList expenses={expenses} selectedMonth={selectedMonth} />
    </Container>
  );
};

export default Home;
