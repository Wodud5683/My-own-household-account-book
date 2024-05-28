// src/redux/reducers/rootReducer.js

import { combineReducers } from 'redux';
import expensesReducer from './Expenses'; // expenses reducer 파일의 경로를 적절히 수정합니다.

const rootReducer = combineReducers({
  expenses: expensesReducer,
});

export default rootReducer;
