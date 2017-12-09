import { combineReducers } from 'redux';
import Mines from './reducer-mines';
import Span from './reducer-span';

const rootReducer = combineReducers({
  Mines,
  Span
});

export default rootReducer;