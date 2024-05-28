import React, { useContext } from 'react';
import styled from 'styled-components';
import ExpenseForm from '../components/ExpenseForm';
import MonthSelector from '../components/MonthSelector';
import ExpenseList from '../components/ExpenseList';
import { ExpenseContext } from '../context/ExpenseContext';

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #E9F7F6;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Home = () => {
  const { filteredExpenses } = useContext(ExpenseContext);

  return (
    <>
      <Container>
        <ExpenseForm />
      </Container>
      <Container>
        <MonthSelector />
      </Container>
      <Container>
        <ExpenseList expenses={filteredExpenses} />
      </Container>
    </>
  );
};

export default Home;
