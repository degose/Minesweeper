
let array = [];
let row = 8;
let col = 8;
let mines = 10;

export function spanValue(row,col){
  if(array[row] === undefined || array[row][col] === undefined){
    return 'unValue';
  } else {
    return array[row][col];
  }
}

export function setRandomMines() {
  let obj = {};

  // 8x8 array 만들기
  // 8개의 array를 만든 후 그 하나하나에 8개의 array를 또 만든다.    
  for(let i=0; i<row; i++){
    array[i] = [];
    for(let j=0; j<col; j++){
      array[i].push(0);
      obj[i + '' + j] = {
        text: '',
        classList: 'box first'
      }
    }
  }

  // 랜덤숫자를 [row][col]에 넣어 spanArray에 mines 넣기
  let placedMines = 0;
  let randomRow,randomCol;
  while(placedMines < mines){
    // 0~7까지의 랜덤 숫자
    randomRow = Math.floor(Math.random() * row);
    randomCol = Math.floor(Math.random() * col);
    if(array[randomRow][randomCol] === 0){
      // 숫자 9는 mines인지 아닌지를 판별하기 위한 숫자
      array[randomRow][randomCol] = 9;
      placedMines++;
    }
  }

  // mines 조건에 따른 숫자 넣기
  for(let i=0; i < row; i++){
    for(let j=0; j< col; j++){
      if(array[i][j] === 9){
        // 만약 spanArray에 mines가 있으면
        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            // -1, 0, 1
            if(ii!==0 || jj!==0){
              if(spanValue(i+ii,j+jj) !== 9 && spanValue(i+ii,j+jj) !== 'unValue'){
                array[i+ii][j+jj]++;
              }
            }
          }
        }
      }
    }
  }

  return {array, obj};
}
