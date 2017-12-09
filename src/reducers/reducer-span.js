import * as actions from '../actions/index';
import update from 'react-addons-update';


const initialState = {
  mineCount: 10,
  opened: null,
  isFlag: null,
  isBomb: null,
  isNumber: null,
  isOpen: null
};


export default function clickSpan(state = initialState, action) {
  switch (action.type) {
    // 깃발 추가
    case actions.CREATE_FLAG:
      return update(state, {
        'isFlag': {$set: action.payload},
        'mineCount': {$set: action.mineCount--}
      })

    // 깃발 제거
    case actions.DELETE_FLAG:
      return update(state, {
        'isFlag': {$set: action.payload},
        'mineCount': {$set: action.mineCount++}
      })

    // 지뢰(9)를 눌렀을 때
    case actions.GAME_OVER:
      return update(state, {
        'isBomb': {$set: action.payload},
      })
    
    // 모든 지뢰에 깃발을 꼽고 모든 span을 눌렀을 때
    case actions.FINISH_GAME:
      return update(state, {
        'opened': {$set: action.payload},
      })
    
    // 숫자를 눌렀을 때 -> 숫자 표시
    case actions.CLICK_NUMBER:
      return update(state, {
        'isNumber': {$set: action.payload},
      })
    
    // 빈곳(0)을 눌렀을 때 -> 확장
    case actions.CLICK_EMPTY:
      return update(state, {
        'isOpen': {$set: action.payload},
      })

      default:
        return state;
  }
}