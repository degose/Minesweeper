// 랜덤 8*8 오브젝트 생성 utils

let obj = {};

export function boxValue(row,col){
  
  if(obj[`${row}${col}`] === undefined){
    // obj['-1'+'0']등과 같은 없는 값이 있을 경우 unValue  
    return 'unValue';
  } else {
    return obj[`${row}${col}`].isState;
  }
}

export function setRandomMines() {
  const row = 8;
  const col = 8;
  const mines = 10;
 
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
    // 10개의 지뢰를 랜덤[row+col]에 위치
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
        // 만약 boxArray에 mines가 있으면
        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            // -1, 0, 1
            if(ii!==0 || jj!==0){
              if(boxValue(i+ii,j+jj) !== 9 && boxValue(i+ii,j+jj) !== 'unValue'){
                // 만약 [0,0]이면 [-1,-1],[-1,0],[-1,1],[0,-1],[0,0][0,1],[1,-1],[1,0],[1,1]
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

