import { SET_ORDER_LIST } from '../Actions/actionTypes';

const initialState = {
  ordem: 'Ordenar por data'
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_LIST:
       return {
         ...state,
         ordem: action.ordem,
      }
    default:
      return state;
  }
};