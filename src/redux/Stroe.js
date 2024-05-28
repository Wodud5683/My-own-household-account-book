import { createStore } from 'redux';
import rootReducer from './reducers'; // reducers 폴더 안에 rootReducer.js 파일이 있다고 가정합니다.

const store = createStore(rootReducer);

export default store;
