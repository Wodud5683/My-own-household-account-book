import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ExpenseContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  width: 758px;
  margin: 20px auto; 
`;

const ExpenseItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ExpenseDate = styled.span`
  color: #888;
  font-size: 14px;
`;

const ExpenseTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const ExpenseAmount = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const ExpenseDescription = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  color: #555;
`;

const ExpenseList = ({ expenses }) => {
  const navigate = useNavigate();

  const handleExpenseClick = (id) => {
    navigate(`/expense/${id}`);
  };

  return (
    <ExpenseContainer>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} onClick={() => handleExpenseClick(expense.id)}>
          <ExpenseDetails>
            <ExpenseDate>{expense.date}</ExpenseDate>
            <ExpenseTitle>{expense.item}</ExpenseTitle>
            <ExpenseDescription>{expense.description}</ExpenseDescription>
          </ExpenseDetails>
          <ExpenseAmount>{expense.amount.toLocaleString()} 원</ExpenseAmount>
        </ExpenseItem>
      ))}
    </ExpenseContainer>
  );
};

export default ExpenseList;
