import { SUBMIT_ANSWER, SET_ANSWERS } from "../constants";

const initialState = {
  ansOptions: [],
  winsCounter: 0,
  answered: false
};

export function carouselReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ANSWER: {
      if (!state.answered) {
        const { answer } = action.payload;
        if (answer === state.painting.author) {
          alert("CORRECT!");
          return {
            ...state,
            winsCounter: state.winsCounter + 1,
            answered: true
          };
        } else {
          alert("WRONG!");
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
      const { answers, author } = action.payload;
      return {
        ...state,
        ansOptions: answers,
        painting: {
          ...state.painting,
          author: author.name
        }
      };
    }
    default: {
      return state;
    }
  }
}
