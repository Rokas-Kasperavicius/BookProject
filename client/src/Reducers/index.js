import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import state from './userReducer';

const rootReducer = combineReducers({
  form,
  state,
});

export default rootReducer;