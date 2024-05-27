import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MonthSelector from '../components/MonthSelector';
import ExpenseList from '../components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  padding: 20px;
  `;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #00a6a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 10px 0;
`;

const Home = ({ expenses, setExpenses }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const savedMonth = localStorage.getItem('selectedMonth');
    return savedMonth ? parseInt(savedMonth) : 1;
  });

  const [formData, setFormData] = useState({
    date: '',
    item: '',
    amount: '',
    description: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('selectedMonth', selectedMonth);
  }, [selectedMonth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { date, amount } = formData;
    if (!date || !amount) {
      return '날짜와 금액을 입력해주세요.';
    }
    if (isNaN(new Date(date).getTime())) {
      return '유효한 날짜를 입력해주세요.';
    }
    if (isNaN(amount) || amount <= 0) {
      return '유효한 금액을 입력해주세요.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    const newExpense = {
      id: uuidv4(),
      ...formData,
      amount: parseFloat(formData.amount)
    };
    setExpenses([...expenses, newExpense]);
    setFormData({
      date: '',
      item: '',
      amount: '',
      description: ''
    });
    setError('');
  };

  const filteredExpenses = expenses.filter(expense =>
    new Date(expense.date).getMonth() + 1 === selectedMonth
  );

  const handleExpenseClick = (id) => {
    navigate(`/expense/${id}`);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="item"
          placeholder="지출 항목"
          value={formData.item}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="amount"
          placeholder="지출 금액"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="description"
          placeholder="지출 내용"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Button type="submit">저장</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <ExpenseList expenses={filteredExpenses} onExpenseClick={handleExpenseClick} />
    </Container>
  );
};

export default Home;
