import * as actions from '../actions/index';
import update from 'react-addons-update';


const initialState = {
  spans : {},
  opened: 0,
  popupText: '',
  mines: 10
};


export default function stateSpan(state = initialState, action) {
  switch (action.type) {

    // span obj create
    case actions.CREATE_SPANS:
      return update(state, {
        spans: {$set: action.payload},
      })
      

    // 깃발 추가
    case actions.CREATE_FLAG:
      return update(state, {
        'spans': {
          [action.id]: {$set: {text: '⚑', classList: 'box'}}
        },
        'mines': {$set: --state.mines}
      })

    // 깃발 제거
    case actions.DELETE_FLAG:
      return update(state, {
        'spans': {
          [action.id]: {$set: {text: '', classList: 'box'}}
        },
        'mines': {$set: ++state.mines}
      })

    // 숫자를 눌렀을 때 -> 숫자 표시
    case actions.CLICK_NUMBER:
      return update(state, {
        'spans': {
          [action.id]: {$set: {text: action.num, classList: 'box'}}
        },
        'opened': {$set: ++state.opened},
      })
    
    // 빈곳(0)을 눌렀을 때 -> 확장
    case actions.CLICK_EMPTY:
      return update(state, {
        'spans': {
          [action.id]: {$set: {classList: 'box opened'}},
        },
        'opened': {$set: ++state.opened}
      })

    // 지뢰(9)를 눌렀을 때
    case actions.GAME_OVER:
      return update(state, {
        'spans': {
          [action.id]: {$set: {text: '☉', classList: 'box'}},
        },
        'popupText': {$set: '지뢰 발견! 다시 시작하기'},
      })
    
    // 모든 지뢰에 깃발을 꼽고 모든 span이 열리면
    case actions.FINISH_GAME:
      return update(state, {
        'popupText': {$set: '게임 완료! 다시 시작하기'},
      })
    

      default:
        return state;
  }
}