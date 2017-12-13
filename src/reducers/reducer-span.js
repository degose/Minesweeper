import * as actions from '../actions/index';
import update from 'react-addons-update';

const initialState = {
  spans : {},
  spanArray: [],
  opened: 0,
  popupText: '',
  mines: 10,
  time: 0,
  isStopGame: false,
  isFirstTime: true,
  againTime: false
};

export default function stateSpan(state = initialState, action) {
  switch (action.type) {

    // 랜덤 위치에 지뢰를 위치시키고, 그 주변의 숫자값을 배열로 만들고, 각 spans의 obj 만들기
    case actions.CREATE_MINE:
      // console.log('리듀서도 실행 됬니??', action);
      return update(state, {
        'spanArray': {$set: action.spanArray},
        'spans': {$set: action.obj},
      })

    // 다시 시작 시 초기 세팅
    case actions.RESTART_GAME:
    // console.log('처음타임 다시시작', state.isFirstTime)
      return update(state, {
        'popupText': {$set: ''},
        'opened': {$set: 0},
        'mines': {$set: 10},
        'time': {$set: 0},
        'isStopGame': {$set: false},
        'isFirstTime': {$set: true},
        'againTime': {$set: true},
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
          [action.id]: {$set: {text: '', classList: 'box first'}}
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

    // 지뢰(9)를 눌렀을 때 -> 팝업창이 뜸
    case actions.GAME_OVER:
      return update(state, {
        'spans': {
          [action.id]: {$set: {text: '⊗', classList: 'box'}},
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
        'isFirstTime': {$set: false},
        'time': {$set: ++state.time},
      })

      default:
        return state;
  }
}