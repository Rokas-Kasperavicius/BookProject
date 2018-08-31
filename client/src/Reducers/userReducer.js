import { SEND_USER, CLEAR } from "../Constants/Action-Types";

const initialState = {
  logged_user: [],
};

const state = (state = initialState, action) => {
  switch (action.type) {
    case SEND_USER:
      return { ...state, logged_user: action.payload };
    case CLEAR:
      return { ...state, logged_user: action.payload };
    default:
      return state;
  }
};

export default state;