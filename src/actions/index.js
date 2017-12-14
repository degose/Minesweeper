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

export function createMine(spanArray, obj) {
  return {
    type: CREATE_MINE,
    spanArray,
    obj
  };
}

export function updateSpans(obj,num) {
  return {
    type: UPDATE_SPANS,
    obj,
    num
  };
}

export function restartGame() {
  return {
    type: RESTART_GAME,
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

export function startTime() {
  return {
    type: START_TIME,
  };
}

