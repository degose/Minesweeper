import * as actions from '../actions/index';
import update from 'react-addons-update';

const initialState = {
  spans : {},
  opened: 0,
  popupText: '',
  mines: 10,
  time: 0,
  isStopGame: false,
};

export default function stateSpan(state = initialState, action) {
  switch (action.type) {

    // 각 spans의 obj 만들기 / 다시 시작하기 버튼 클릭시 초기값 세팅
    case actions.CREATE_MINE:
      return update(state, {
        'spans': {$set: action.obj},
        'popupText': {$set: ''},
        'opened': {$set: 0},
        'mines': {$set: 10},
        'time': {$set: 0},
        'isStopGame': {$set: false},
      })

    // 빈 곳(0)을 누르고 주변 spans의 obj를 바꾸고, opened를 체크 후 다시 state에 set해준다.
    case actions.UPDATE_SPANS:
      return update(state, {
        'spans': {$set: action.obj},
        'opened': {$set: state.opened + action.num},
      })

    // 다시 시작 시 popuptext, time을 멈춤
    case actions.RESTART_GAME:
      return update(state, {
        'popupText': {$set: '정말 다시 시작하겠습니까?'},
        'isStopGame': {$set: true},
      })
      
    // 깃발 추가
    case actions.CREATE_FLAG:
      return update(state, {
        'spans': {
          [action.id]: {
            text: {$set: '⚑'},
            isFirst: {$set: false},
          }
        },
        'mines': {$set: --state.mines},
      })

    // 깃발 제거(다시 초기화)
    case actions.DELETE_FLAG:
      return update(state, {
        'spans': {
          [action.id]: {
            text: {$set: ''},
            isFirst: {$set: true},
          }
        },
        'mines': {$set: ++state.mines}
      })

    // 숫자를 눌렀을 때 -> 숫자 표시
    case actions.CLICK_NUMBER:
      return update(state, {
        'spans': {
          [action.id]: {
            text: {$set: action.num},
            isFirst: {$set: false},
          }
        },
        'opened': {$set: ++state.opened},
      })
    
    // 빈곳(0)을 눌렀을 때 -> opened class로 바꿔줌
    case actions.CLICK_EMPTY:
      return update(state, {
        'spans': {
          [action.id]: {
            text: {$set: ''},
            classList: {$set: 'box opened'},
            isFirst: {$set: false},
          },
        },
        'opened': {$set: ++state.opened},
      })

    // 지뢰(9)를 눌렀을 때 -> 팝업창이 뜸, time이 멈춤
    case actions.GAME_OVER:
      return update(state, {
        'spans': {
          [action.id]: {
            text: {$set: '⊗'},
            classList: {$set: 'box'},
            isFirst: {$set: false},
          },
        },
        'popupText': {$set: '지뢰 발견! 다시 시작하기'},
        'mines': {$set: --state.mines},
        'isStopGame': {$set: true},
      })
    
    // 모든 지뢰에 깃발을 꼽고 모든 span이 열리면 -> 팝업창이 뜸
    case actions.FINISH_GAME:
      return update(state, {
        'popupText': {$set: '게임 완료! 다시 시작하기'},
        'isStopGame': {$set: true},
      })
    
    // 처음 span을 클릭한 순간 타임 시작
    case actions.START_TIME:
      return update(state, {
        'time': {$set: ++state.time},
      })

      default:
        return state;
  }
}