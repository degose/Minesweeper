// action type 정의
export const CREATE_MINE = 'CREATE_MINE';
export const CREATE_NUMBER = 'CREATE_NUMBER';
export const CREATE_FLAG = 'CREATE_FLAG';
export const DELETE_FLAG = 'DELETE_FLAG';
export const START_TIME = 'START_TIME';
export const STOP_TIME = 'STOP_TIME';
export const RESET_GAME = 'RESET_GAME';
export const CLICK_BOX = 'CLICK_BOX';
export const FINISH_GAME = 'FINISH_GAME';
export const GAME_OVER = 'GAME_OVER';

export function createMine(spanArray) {
  return {
    type: CREATE_MINE,
    payload: spanArray
  };
}

export function createNumber() {
  return {
    type: CREATE_NUMBER,
    // payload: request
  };
}

export function createFlag() {
  return {
    type: CREATE_FLAG,
  };
}

