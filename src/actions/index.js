// action type 정의
export const CREATE_MINE = 'CREATE_MINE';
export const CREATE_FLAG = 'CREATE_FLAG';
export const DELETE_FLAG = 'DELETE_FLAG';
export const CLICK_NUMBER = 'CLICK_NUMBER';
export const CLICK_EMPTY = 'CLICK_EMPTY';
export const GAME_OVER = 'GAME_OVER';
export const FINISH_GAME = 'FINISH_GAME';
export const RESET_GAME = 'RESET_GAME';

export function createMine(spanArray) {
  return {
    type: CREATE_MINE,
    payload: spanArray
  };
}

export function createFlag() {
  return {
    type: CREATE_FLAG,
    payload: true
  };
}

export function deleteFlag() {
  return {
    type: DELETE_FLAG,
    payload: false
  };
}

export function clickNumber(num) {
  return {
    type: CLICK_NUMBER,
    payload: num
  };
}

export function clickEmpty(num) {
  return {
    type: CLICK_EMPTY,
    payload: num
  };
}

export function gameOver(num) {
  return {
    type: GAME_OVER,
    payload: num
  };
}

export function finishGame(num) {
  return {
    type: FINISH_GAME,
    payload: num
  };
}

export function resetGame() {
  return {
    type: RESET_GAME,
    payload: true
  };
}

