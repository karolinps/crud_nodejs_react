import React, {Component} from 'react';

const initialState = {
    errors: {}
}
  
export default  function yourReducer(state = initialState, action) {
    switch(action.message){

    case 'SHOW_ERROR':
      return {
        ...state,
        errors: action.message
      }
    default:
      return state
  } 

}