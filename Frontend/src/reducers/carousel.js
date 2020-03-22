import {
  SUBMIT_ANSWER,
  SET_ANSWERS,
  SET_CORRECT_ANSWER,
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
    case SUBMIT_ANSWER: {
      if (!state.answered) {
        const answer = action.payload;
        if (answer === state.correctAnswer.answer) {
          alert("CORRECT!");   // TODO: move alerts to actions
          return {
            ...state,
            winsCounter: state.winsCounter + 1,
            answered: true
          };
        } else {
          alert("WRONG!");    // TODO: move alerts to actions
          return {
            ...state,
            winsCounter: 0,
            answered: true
          };
        }
      }
      return state;
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
