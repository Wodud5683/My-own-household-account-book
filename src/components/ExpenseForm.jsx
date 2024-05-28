import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ExpenseContext } from '../context/ExpenseContext';
import { v4 as uuidv4 } from 'uuid';

const Form = styled.form`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 150px;
  font-size: 15px;
`;

const Button = styled.button`
  padding: 10px; 
  background-color: #007bff;
  color: white;
  border: 1px solid;
  border-radius: 5px;
  width: 150px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: rgb(51, 51, 51);
  text-align: left;
  height: 15px;
`;

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [date, setDate] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && item && amount && description) {
      addExpense({
        id: uuidv4(),
        date,
        item,
        amount: parseFloat(amount),
        description,
      });
      setDate('');
      setItem('');
      setAmount('');
      setDescription('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        날짜
        <Input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </Label>
      <Label>
        항목
        <Input 
          type="text" 
          value={item} 
          placeholder="지출 항목"
          onChange={(e) => setItem(e.target.value)} 
          required 
        />
      </Label>
      <Label>
        금액
        <Input 
          type="number" 
          value={amount} 
          placeholder="지출 금액"
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
      </Label>
      <Label>
        내용
        <Input 
          type="text" 
          value={description} 
          placeholder="지출 내용"
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </Label>
      <Button type="submit">저장</Button>
    </Form>
  );
};

export default ExpenseForm;
