import React, { useEffect } from 'react';
import styled from 'styled-components';

const MonthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MonthButton = styled.button`
  width: 110px;
  height: 70px;
  background-color: ${(props) => (props.active ? '#00a6a6' : '#f8f9fa')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
`;

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  useEffect(() => {
    const savedMonth = localStorage.getItem('selectedMonth');
    if (savedMonth) {
      setSelectedMonth(savedMonth);
    }
  }, [setSelectedMonth]);

  useEffect(() => {
    localStorage.setItem('selectedMonth', selectedMonth);
  }, [selectedMonth]);

  return (
    <MonthContainer>
      {months.map((month, index) => (
        <MonthButton
          key={index}
          active={selectedMonth === month}
          onClick={() => setSelectedMonth(month)}
        >
          {month}
        </MonthButton>
      ))}
    </MonthContainer>
  );
};

export default MonthSelector;
