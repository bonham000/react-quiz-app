import * as types from '../constants/actionTypes';

const counting = (state = 0, action) => {
  switch (action.type) {
    case types.COUNT_INC:
      return state + 1;
    case types.COUNT_DEC:
      return state - 1;
    default:
      return state;
  }
};

export default counting;
