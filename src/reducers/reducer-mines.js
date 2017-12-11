import * as actions from '../actions/index';
import update from 'react-addons-update';


const initialState = {
  spanArray: [],
};


export default function createMine(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_MINE:
      return update(state, {
        'spanArray': {$set: action.payload},
      })

    case actions.RESET_GAME:
      return update(state, {
        'spanArray': {$set: action.payload},
      })

      default:
        return state;
  }
}