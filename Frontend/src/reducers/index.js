import {
  SUBMIT_ANSWER,
  SET_PAINTING,
  SET_ANSWERS,
  SET_CORRECT_ANSWER
} from "../constants/actionTypes";

const initialState = {
  painting: {},
  ansOptions: [],
  winsCounter: 0,
  answered: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ANSWER: {
      if (!state.answered) {
        const { answer } = action.payload;
        if (answer === state.painting.author) {
          alert("CORRECT!");
          return {
            ...state,
            winsCounter: state.winsCounter + 1,
            answered: true
          };
        } else {
          alert("WRONG!");
          return {
            ...state,
            winsCounter: 0,
            answered: true
          };
        }
      }
      return state;
    }
    case SET_PAINTING: {
      const { url, id } = action.payload;
      return {
        ...state,
        painting: {
          url: `${process.env.REACT_APP_BACKEND_ADDRESS}${url}`,
          id: id
        },
        answered: false
      };
    }
    case SET_ANSWERS: {
      const { answers, author } = action.payload;
      return {
        ...state,
        ansOptions: answers,
        painting: {
          ...state.painting,
          author: author.name
        }
      };
    }
    // case SET_CORRECT_ANSWER: {
    //   const { author } = action.payload;
    //   const i = Math.floor(Math.random() * Math.floor(state.ansOptions.length));
    //   return {
    //     ...state,
    //     ansOptions: state.ansOptions
    //       .slice(0, i)
    //       .concat(author, state.ansOptions.slice(i)),
    //     painting: {
    //       ...state.painting,
    //       author: author
    //     }
    //   };
    // }
    default: {
      return state;
    }
  }
}

export default rootReducer;
