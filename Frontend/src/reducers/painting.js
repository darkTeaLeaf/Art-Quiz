import {
  SET_PAINTING,
  SET_PAINTING_FAIL,
  GET_PAINTINGS_LIST,
  GET_PAINTINGS_LIST_SUCCESS,
  GET_PAINTINGS_LIST_FAILURE,
} from "../constants";

const initialState = {
  id: null,
  url: "",
  paintingsList: {
    data: null,
    error: "",
    loaded: false,
  },
};

export function paintingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAINTING: {
      const { url, id } = action.payload;
      return {
        ...state,
        url: process.env.REACT_APP_BACKEND_ADDRESS + url,
        id,
      };
    }

    case SET_PAINTING_FAIL: {
      console.log(`${SET_PAINTING_FAIL} ERROR: ${action.payload}`);
      return state;
    }

    case GET_PAINTINGS_LIST: {
      return {
        ...state,
        paintingsList: {
          ...state.paintingsList,
          loaded: false,
          error: "",
        },
      };
    }

    case GET_PAINTINGS_LIST_SUCCESS: {
      return {
        ...state,
        paintingsList: {
          ...state.paintingsList,
          data: action.data,
          error: "",
          loaded: true,
        },
      };
    }

    case GET_PAINTINGS_LIST_FAILURE: {
      return {
        ...state,
        paintingsList: {
          ...state.paintingsList,
          error: action.error,
          loaded: false,
        },
      };
    }

    default:
      return state;
  }
}
