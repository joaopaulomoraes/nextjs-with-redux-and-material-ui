import {DECREMENT, INCREMENT} from '../constants'
import {HYDRATE} from "next-redux-wrapper";

export const counter = (state , action) => {
  console.log(state)
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload};
    case INCREMENT:
      return {
          value: state.value + 1,
          action: 'increment',
          from: action.from
      }

    case DECREMENT:
      return {
          value: state.value - 1,
          action: 'decrement',
          from: action.from
      }

    default:
      return {...state}
  }
}
