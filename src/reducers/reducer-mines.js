import * as actions from '../actions/index';
import update from 'react-addons-update';


const initialState = {
  spanArray: [],
};


export default function createMine(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_MINE:
      console.log('리듀서도 실행 됬니??', action.payload);
      return update(state, {
        'spanArray': {$set: action.payload},
      })

      default:
        return state;
  }
}