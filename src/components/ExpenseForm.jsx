import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MonthSelector from './MonthSelector';
import { useExpenses } from '../context/ExpenseContext';

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  flex: 1;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #ccc;
  }
`;

const ExpenseForm = () => {
  const { selectedMonth, expenses, setExpenses } = useExpenses();
  const [date, setDate] = useState('2024-01-01');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedMonth) {
      const monthIndex = selectedMonth.replace('월', '').padStart(2, '0');
      setDate(`2024-${monthIndex}-01`);
    }
  }, [selectedMonth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now().toString(),
      date,
      item,
      amount: parseFloat(amount),
      description,
    };
    setExpenses([...expenses, newExpense]);
    setItem('');
    setAmount('');
    setDescription('');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
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
              onChange={(e) => setItem(e.target.value)} 
              placeholder="지출 항목" 
              required 
            />
          </Label>
          <Label>
            금액
            <Input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="지출 금액" 
              required 
            />
          </Label>
          <Label>
            내용
            <Input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="지출 내용" 
              required 
            />
          </Label>
        </InputGroup>
        <Button type="submit">저장</Button>
      </Form>
      <MonthSelector />
    </Container>
  );
};

export default ExpenseForm;