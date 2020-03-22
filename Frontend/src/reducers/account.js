import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  SIGN_OUT
} from "../constants";

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

    case GET_USER_DATA_SUCCESS: {
      return { ...state };
    }

    case GET_USER_DATA_FAILURE: {
      return { ...state };
    }

    default:
      return state;
  }
}
