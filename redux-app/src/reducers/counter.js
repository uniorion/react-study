import * as types from '../actions/ActionTypes';


// 리듀서의 초기 상태(이전 상태가 정의되어 있지 않으므로)
const initialState = {
  number: 0, 
  dummy: 'dumbdumb',
  dumbObject: {
    d: 0,
    u: 1, 
    m: 2, 
    b: 3
  }
};

export default function counter(state = initialState, action) {
  /* 액션 타입에 따라 실행 */
  switch(action.type) {
    
    case types.INCREMENT:
      // return { number: state.number + 1 };
      // return { ...state, number: state.number + 1 };
      return { 
        ...state, 
        number: state.number + 1,
        dumbObject: { ...state.dumbObject, u: 0 }
      };
      break;
   
    case types.DECREMENT:
      return {
        ...state, 
        number: state.number - 1
      };
      break;
      
    default:
      return state;
  }
}