// action type 정의
export const CREATE_MINE = 'CREATE_MINE';
export const UPDATE_SPANS = 'UPDATE_SPANS';
export const RESTART_GAME = 'RESTART_GAME';
export const DELETE_FIRST = 'DELETE_FIRST';
export const CREATE_FLAG = 'CREATE_FLAG';
export const DELETE_FLAG = 'DELETE_FLAG';
export const CLICK_NUMBER = 'CLICK_NUMBER';
export const CLICK_EMPTY = 'CLICK_EMPTY';
export const GAME_OVER = 'GAME_OVER';
export const FINISH_GAME = 'FINISH_GAME';
export const START_TIME = 'START_TIME';

// util에서 만들어진 8x8 obj를 받아서 리듀서로 보낸다.
export function createMine(obj) {
  return {
    type: CREATE_MINE,
    obj
  };
}

// 빈 곳(0)을 눌렀을 때 함수 컴포넌트 안에서 처리된 obj와 더해진 opened를 받아서 리듀서로 보낸다.
export function updateSpans(obj,num) {
  return {
    type: UPDATE_SPANS,
    obj,
    num
  };
}

// 다시 시작 버튼을 눌렀을 때 다시시작하기 popup창이 뜨고 time을 정지시킨다.
export function restartGame() {
  return {
    type: RESTART_GAME,
  };
}

// 오른쪽 클릭을 하면 클릭한 span의 id값을 리듀서로 보낸다.
export function createFlag(id) {
  return {
    type: CREATE_FLAG,
    id
  };
}

// 오른쪽 클릭을 했을 때 깃발 상태라면 깃발을 삭제한다.
export function deleteFlag(id) {
  return {
    type: DELETE_FLAG,
    id
  };
}

// span이 숫자일 경우 span의 id 값과 state 숫자 값을 리듀서로 보낸다.
export function clickNumber(id,num) {
  return {
    type: CLICK_NUMBER,
    id,
    num
  };
}

// span이 빈곳(0)일 경우
export function clickEmpty(id) {
  return {
    type: CLICK_EMPTY,
    id
  };
}

// span이 지뢰(9)일 경우
export function gameOver(id) {
  return {
    type: GAME_OVER,
    id
  };
}

// 지뢰를 제외한 모든 span이 opened되었을 경우
export function finishGame() {
  return {
    type: FINISH_GAME,
  };
}

// 첫 span을 누르면 time이 시작된다.
export function startTime() {
  return {
    type: START_TIME,
  };
}


