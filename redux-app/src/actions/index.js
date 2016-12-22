// import { INCREMENT, DECREMENT, SET_COLOR } from './ActionTypes';
import * as types from './ActionTypes';


// ---------- 액션 생성자 함수 정의 ----------

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}

export function setColor(color) {
  return {
    type: types.SET_COLOR,
    color   // color: color 와 동일한 의미
  };
}