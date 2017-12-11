// action type 정의
export const CREATE_MINE = 'CREATE_MINE';
export const CREATE_SPANS = 'CREATE_SPANS';
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

export function createSpans(obj) {
  return {
    type: CREATE_SPANS,
    payload: obj
  };
}

export function createFlag(id) {
  return {
    type: CREATE_FLAG,
    id
  };
}

export function deleteFlag(id) {
  return {
    type: DELETE_FLAG,
    id
  };
}

export function clickNumber(id,num) {
  return {
    type: CLICK_NUMBER,
    id,
    num
  };
}

export function clickEmpty(id) {
  return {
    type: CLICK_EMPTY,
    id
  };
}

export function gameOver(id) {
  return {
    type: GAME_OVER,
    id
  };
}

export function finishGame() {
  return {
    type: FINISH_GAME,
  };
}

export function resetGame() {
  return {
    type: RESET_GAME,
    payload: true
  };
}

