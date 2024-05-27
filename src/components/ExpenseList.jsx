import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../context/ExpenseContext";

const ExpenseContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out 0s;
  width: 758px;
  margin: 0 auto;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #4c317e;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ExpenseDescription = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExpenseList = () => {
  const { expenses } = useExpenses();
  const navigate = useNavigate();

  const handleExpenseClick = (id) => {
    navigate(`/expense/${id}`);
  };

  return (
    <ExpenseContainer>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          onClick={() => handleExpenseClick(expense.id)}
        >
          <span>{expense.date}</span>
          <span>{expense.item}</span>
          <ExpenseDescription>{expense.description}</ExpenseDescription>
          <span>{expense.amount.toLocaleString()} 원</span>
        </ExpenseItem>
      ))}
    </ExpenseContainer>
  );
};

export default ExpenseList;
