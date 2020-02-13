import { SWITCH_PAINTING, SUBMIT_ANSWER } from "../constants/actionTypes";

const initialState = {
  painting: {},
  ansOptions: [],
  winsCounter: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_PAINTING: {
      return {
        ...state,
        painting: { ...state.newPainting }
      };
    }
    case SUBMIT_ANSWER: {
      const { answer } = action.payload;
      if (answer === state.painting.name) {
        alert("CORRECT!");
        return {
          ...state,
          winsCounter: state.winsCounter + 1
        };
      }
      else {
        alert("WRONG!");
        return {
          ...state,
          winsCounter: 0
        };
      }
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;
