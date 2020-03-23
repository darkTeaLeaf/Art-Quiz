import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  UPDATE_USER_DATA,
  GET_USER_DATA_FAILURE,
  SIGN_OUT
} from "../constants";

const initialState = {
  id: localStorage.getItem("id"),
  isAuthenticated: localStorage.getItem("token") !== null ? true : false,
  userData: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
    achievements: [],
    statistic: {
      winRate: 0,
      gamesTotal: 0,
      winsTotal: 0
    }
  }
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case SIGN_OUT: {
      return {
        ...state,
        ...action.payload
      };
    }

    case UPDATE_USER_DATA: {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload }
      };
    }

    case GET_USER_DATA_FAILURE: {
      return { ...state };
    }

    default:
      return state;
  }
}
