import { SWITCH_PAINTING, SUBMIT_ANSWER, SET_PAINTING } from "../constants/actionTypes";

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
    case SET_PAINTING: {
      const { url } = action.payload;
      return {
        ...state,
        painting: {
          url: "http://127.0.0.1:8000" + url
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;
