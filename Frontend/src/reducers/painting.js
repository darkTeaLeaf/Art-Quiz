import {
  SET_PAINTING,
  SET_PAINTING_FAIL,
  GET_PAINTINGS,
  GET_PAINTINGS_SUCCESS,
  GET_PAINTINGS_FAILURE,
  GET_AUTHORS,
  GET_AUTHORS_SUCCESS,
  GET_AUTHORS_FAILURE,
  GET_STYLES,
  GET_STYLES_SUCCESS,
  GET_STYLES_FAILURE,
  UPDATE_PAINTING,
  UPDATE_PAINTING_SUCCESS,
  UPDATE_PAINTING_FAILURE,
  ADD_PAINTING,
  ADD_PAINTING_SUCCESS,
  ADD_PAINTING_FAILURE,
} from "../constants";

const initialState = {
  id: null,
  url: "",
  paintings: {
    data: null,
    error: "",
    loaded: false,
  },
  authors: {
    data: null,
    error: "",
    loaded: false,
  },
  styles: {
    data: null,
    error: "",
    loaded: false,
  },
  paintingUpdate: {
    loaded: true,
    error: "",
  },
  paintingAdd: {
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

    case GET_PAINTINGS: {
      return {
        ...state,
        paintings: {
          ...state.paintings,
          loaded: false,
          error: "",
        },
      };
    }

    case GET_PAINTINGS_SUCCESS: {
      return {
        ...state,
        paintings: {
          ...state.paintings,
          data: action.data,
          error: "",
          loaded: true,
        },
      };
    }

    case GET_PAINTINGS_FAILURE: {
      return {
        ...state,
        paintings: {
          ...state.paintings,
          error: action.error,
          loaded: false,
        },
      };
    }

    case GET_AUTHORS: {
      return {
        ...state,
        authors: {
          ...state.authors,
          loaded: false,
          error: "",
        },
      };
    }

    case GET_AUTHORS_SUCCESS: {
      return {
        ...state,
        authors: {
          ...state.authors,
          data: action.data,
          error: "",
          loaded: true,
        },
      };
    }

    case GET_AUTHORS_FAILURE: {
      return {
        ...state,
        authors: {
          ...state.authors,
          error: action.error,
          loaded: false,
        },
      };
    }

    case GET_STYLES: {
      return {
        ...state,
        styles: {
          ...state.styles,
          loaded: false,
          error: "",
        },
      };
    }

    case GET_STYLES_SUCCESS: {
      return {
        ...state,
        styles: {
          ...state.styles,
          data: action.data,
          error: "",
          loaded: true,
        },
      };
    }

    case GET_STYLES_FAILURE: {
      return {
        ...state,
        styles: {
          ...state.styles,
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
        paintings: {
          ...state.paintings,
          data: state.paintings.data.map((painting) =>
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

    case ADD_PAINTING: {
      return {
        ...state,
        paintingAdd: {
          ...state.paintingAdd,
          loaded: false,
        },
      };
    }

    case ADD_PAINTING_SUCCESS: {
      return {
        ...state,
        paintingAdd: {
          ...state.paintingAdd,
          loaded: true,
        },
        paintings: {
          ...state.paintings,
          data: [action.data, ...state.paintings],
        },
      };
    }

    case ADD_PAINTING_FAILURE: {
      return {
        ...state,
        paintingAdd: {
          ...state.paintingAdd,
          loaded: false,
          error: action.error,
        },
      };
    }

    default:
      return state;
  }
}
