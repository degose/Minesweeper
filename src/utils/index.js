
let obj = {};
let row = 8;
let col = 8;
let mines = 10;

export function spanValue(row,col){
  
  if(obj[`${row}${col}`] === undefined){
    return 'unValue';
  } else {
    return obj[`${row}${col}`].isState;
  }
}

export function setRandomMines() {
 
  for(let i=0; i<row; i++){
    for(let j=0; j<col; j++){
      obj[`${i}${j}`] = {
        text: '',
        classList: 'box',
        isFirst: true,
        isState: 0
      }
    }
  }

  
  let placedMines = 0;
  let randomRow,randomCol;
  while(placedMines < mines){
    // 0~7까지의 랜덤 숫자
    randomRow = Math.floor(Math.random() * row);
    randomCol = Math.floor(Math.random() * col);
    if(obj[`${randomRow}${randomCol}`].isState === 0){
      // 숫자 9는 mines인지 아닌지를 판별하기 위한 숫자
      obj[`${randomRow}${randomCol}`].isState = 9;
      placedMines++;
    }
  }

  // mines 조건에 따른 숫자 넣기
  for(let i=0; i < row; i++){
    for(let j=0; j< col; j++){
      if(obj[`${i}${j}`].isState === 9){
        // 만약 spanArray에 mines가 있으면
        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            // -1, 0, 1
            if(ii!==0 || jj!==0){
              if(spanValue(i+ii,j+jj) !== 9 && spanValue(i+ii,j+jj) !== 'unValue'){
                obj[`${i+ii}${j+jj}`].isState++;
              }
            }
          }
        }
      }
    }
  }

  return obj;
}

