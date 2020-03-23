import {
  SET_ANSWERS,
  SET_CORRECT_ANSWER,
  SUBMIT_CORRECT_ANSWER,
  SUBMIT_INCORRECT_ANSWER,
  SET_ANSWERED,
  SET_WINS_COUNTER
} from "../constants";
import { shuffle } from "../helpers";

const initialState = {
  ansOptions: [],
  winsCounter: 0,
  answered: false,
  correctAnswer: null
};

export function carouselReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CORRECT_ANSWER: {
      return {
        ...state,
        winsCounter: state.winsCounter + 1,
        answered: true
      };
    }
    case SUBMIT_INCORRECT_ANSWER: {
      return {
        ...state,
        winsCounter: 0,
        answered: true
      };
    }

    case SET_ANSWERS: {
      return {
        ...state,
        ansOptions: shuffle(action.payload)
      };
    }

    case SET_CORRECT_ANSWER: {
      return {
        ...state,
        correctAnswer: action.payload
      };
    }

    case SET_ANSWERED: {
      return {
        ...state,
        answered: action.payload
      };
    }

    case SET_WINS_COUNTER: {
      return {
        ...state,
        winsCounter: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
