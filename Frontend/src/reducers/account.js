import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT } from "../constants";

const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null ? true : false
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated
      };
    }

    case SIGN_UP_SUCCESS: {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated
      };
    }

    case SIGN_OUT: {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated
      };
    }

    default:
      return state;
  }
}
