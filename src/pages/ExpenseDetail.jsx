import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 22px);
  margin-bottom: 10px;  
  padding: 10px;
  border: 1px solid #dddddd;
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
  font-size: 14px;

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

const ExpenseDetail = ({ expenses, setExpenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = expenses.find(expense => expense.id === id);

  const dateRef = useRef();
  const itemRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (expense) {
      dateRef.current.value = expense.date;
      itemRef.current.value = expense.item;
      setAmount(expense.amount.toString());
      descriptionRef.current.value = expense.description;
    }
  }, [expense]);

  const handleUpdate = () => {
    const updatedExpenses = expenses.map(exp => 
      exp.id === id ? {
        ...exp,
        date: dateRef.current.value,
        item: itemRef.current.value,
        amount: parseFloat(amount),
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
      <label>날짜</label>
      <Input type="date" ref={dateRef} />
      <label>항목</label>
      <Input type="text" ref={itemRef} />
      <label>금액</label>
      <Input 
        type="text" 
        value={amount} 
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, "");
          setAmount(value);
        }} 
      />
      <label>내용</label>
      <Input type="text" ref={descriptionRef} />
      <UpdateButton onClick={handleUpdate}>수정</UpdateButton>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      <NavigateButton onClick={() => navigate('/')}>뒤로가기</NavigateButton>
    </Container>
  );
};

export default ExpenseDetail;
