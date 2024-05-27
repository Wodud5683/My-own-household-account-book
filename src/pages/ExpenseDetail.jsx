import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useExpenses } from '../context/ExpenseContext';

const Container = styled.div`
    width: 800px;
    margin: 0px auto;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
`;

const Input = styled.input`
  display: flex;
  margin-bottom: 10px;  
  padding: 10px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:disabled {
    background-color: #ccc;
  }
`;

const UpdateButton = styled(Button)`
  background-color: rgb(0, 123, 255);
`;

const DeleteButton = styled(Button)`
  background-color: rgb(255, 77, 77);
`;

const NavigateButton = styled(Button)`
  background-color: rgb(108, 117, 125);
`;

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, setExpenses } = useExpenses();
  const expense = expenses.find(expense => expense.id === id);

  const dateRef = useRef();
  const itemRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  const handleUpdate = () => {
    const updatedExpenses = expenses.map(exp => 
      exp.id === id ? {
        ...exp,
        date: dateRef.current.value,
        item: itemRef.current.value,
        amount: parseFloat(amountRef.current.value),
        description: descriptionRef.current.value
      } : exp
    );
    setExpenses(updatedExpenses);
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedExpenses = expenses.filter(exp => exp.id !== id);
      setExpenses(updatedExpenses);
      navigate('/');
    }
  };

  if (!expense) return <div>지출 항목을 찾을 수 없습니다.</div>;

  return (
    <Container>
      <Input type="date" defaultValue={expense.date} ref={dateRef} />
      <Input type="text" defaultValue={expense.item} ref={itemRef} />
      <Input type="number" defaultValue={expense.amount} ref={amountRef} />
      <Input type="text" defaultValue={expense.description} ref={descriptionRef} />
      <UpdateButton onClick={handleUpdate}>수정</UpdateButton>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      <NavigateButton onClick={() => navigate('/')}>뒤로가기</NavigateButton>
    </Container>
  );
};

export default ExpenseDetail;
