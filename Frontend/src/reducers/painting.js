import { SET_PAINTING, BACKEND_ADDRESS } from "../constants";

const initialState = {};

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
