import { SEND_USER, CLEAR } from "../Constants/Action-Types";

export const sendUser = user => ({ type: SEND_USER, payload: user });
export const clear = () => ({ type: CLEAR, payload: [] });