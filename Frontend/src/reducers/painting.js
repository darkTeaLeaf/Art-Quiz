import { SET_PAINTING, BACKEND_ADDRESS } from "../constants";

const initialState = {
  id: null,
  year: null,
  url: "",
  name: "",
  author: "",
  style: "",
  place: ""
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
    default:
      return state;
  }
}
