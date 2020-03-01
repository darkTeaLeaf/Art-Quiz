import { SET_PAINTING, BACKEND_ADDRESS, SET_PAINTING_FAIL } from "../constants";

const initialState = {
  id: null,
  year: null,
  url: "",
  name: "",
  author: "",
  style: "",
  location: ""
};

export function paintingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAINTING: {
      const { url, id } = action.payload;
      return {
        ...state,
        url: BACKEND_ADDRESS + url,
        id: id
      };
    }

    case SET_PAINTING_FAIL: {
      console.log(`${SET_PAINTING_FAIL} ERROR: ${action.payload}`);
      return state;
    }

    default:
      return state;
  }
}
