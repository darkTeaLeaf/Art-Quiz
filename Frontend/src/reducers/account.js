import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  UPDATE_USER_DATA,
  GET_USER_DATA_FAILURE,
  SIGN_OUT,
  SUGGEST_PAINTING,
  SUGGEST_PAINTING_SUCCESS,
  SUGGEST_PAINTING_FAILURE,
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILURE,
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
    isModerator: false,
    statistic: {
      winRate: 0,
      gamesTotal: 0,
      winsTotal: 0,
    },
  },
  paintingSuggestStatus: {
    loaded: true,
    error: "",
  },
  requests: {
    data: null,
    loaded: false,
    error: "",
  },
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SIGN_OUT: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_USER_DATA: {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
    }

    case GET_USER_DATA_FAILURE: {
      return { ...state };
    }

    case SUGGEST_PAINTING: {
      return {
        ...state,
        paintingSuggestStatus: {
          ...state.paintingSuggestStatus,
          loaded: false,
          error: "",
        },
      };
    }

    case SUGGEST_PAINTING_SUCCESS: {
      return {
        ...state,
        paintingSuggestStatus: {
          ...state.paintingSuggestStatus,
          loaded: true,
          error: "",
        },
        requests: {
          ...state.requests,
          data: [...state.requests.data, action.data],
        },
      };
    }

    case SUGGEST_PAINTING_FAILURE: {
      return {
        ...state,
        paintingSuggestStatus: {
          ...state.paintingSuggestStatus,
          loaded: false,
          error: action.error,
        },
      };
    }

    case GET_REQUESTS: {
      return {
        ...state,
        requests: {
          ...state.requests,
          loaded: false,
          error: "",
        },
      };
    }

    case GET_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: {
          ...state.requests,
          loaded: true,
          data: action.data,
          error: "",
        },
      };
    }

    case GET_REQUESTS_FAILURE: {
      return {
        ...state,
        requests: {
          ...state.requests,
          loaded: false,
          error: action.error,
        },
      };
    }

    default:
      return state;
  }
}
