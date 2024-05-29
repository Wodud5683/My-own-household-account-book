import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "../redux/slices/ExpensesSlice";

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

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const expense = expenses.find((expense) => expense.id === id);

  const dateRef = useRef();
  const itemRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  const handleUpdate = () => {
    const updatedExpense = {
      id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: parseFloat(amountRef.current.value),
      description: descriptionRef.current.value,
    };
    dispatch(updateExpense(updatedExpense));
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteExpense(id));
      navigate("/");
    }
  };

  if (!expense) return <div>지출 항목을 찾을 수 없습니다.</div>;

  return (
    <Container>
      <label>날짜</label>
      <Input type="date" defaultValue={expense.date} ref={dateRef} />
      <label>항목</label>
      <Input type="text" defaultValue={expense.item} ref={itemRef} />
      <label>금액</label>
      <Input type="number" defaultValue={expense.amount} ref={amountRef} />
      <label>내용</label>
      <Input
        type="text"
        defaultValue={expense.description}
        ref={descriptionRef}
      />
      <UpdateButton onClick={handleUpdate}>수정</UpdateButton>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      <NavigateButton onClick={() => navigate("/")}>뒤로가기</NavigateButton>
    </Container>
  );
};

export default ExpenseDetail;
