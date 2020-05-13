import {
  SET_PAINTING,
  SET_PAINTING_FAIL,
  GET_PAINTINGS_LIST,
  GET_PAINTINGS_LIST_SUCCESS,
  GET_PAINTINGS_LIST_FAILURE,
  UPDATE_PAINTING,
  UPDATE_PAINTING_SUCCESS,
  UPDATE_PAINTING_FAILURE,
} from "../constants";

const initialState = {
  id: null,
  url: "",
  paintingsList: {
    data: null,
    error: "",
    loaded: false,
  },
  paintingUpdate: {
    loaded: true,
    error: "",
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

    case UPDATE_PAINTING: {
      return {
        ...state,
        paintingUpdate: {
          ...state.paintingUpdate,
          loaded: false,
        },
      };
    }

    case UPDATE_PAINTING_SUCCESS: {
      return {
        ...state,
        paintingUpdate: {
          ...state.paintingUpdate,
          loaded: true,
        },
        paintingsList: {
          ...state.paintingsList,
          data: state.paintingsList.data.map((painting) =>
            painting.id === action.data.id
              ? { ...painting, ...action.data }
              : painting
          ),
        },
      };
    }

    case UPDATE_PAINTING_FAILURE: {
      return {
        ...state,
        paintingUpdate: {
          ...state.paintingUpdate,
          loaded: false,
          error: action.error,
        },
      };
    }

    default:
      return state;
  }
}
