import { SWITCH_PAINTING, SUBMIT_ANSWER } from "../constants/actionTypes";

export function switchPainting() {
  return {
    type: SWITCH_PAINTING,
    payload: {}
  };
}

export function submitAnswer(ans) {
  return {
    type: SUBMIT_ANSWER,
    payload: { answer: ans}
  }
}
