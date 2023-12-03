const { body } = document; // body = document.body
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';
let currentPlayer = 'Player1';
// tr,td만들기 + rows에 넣기
for(let i=0; i<3; i++){
  const $tr = document.createElement('tr'); // $tr === tr
  const cells = [];
  for(let j=0; j<3; j++){
    const $td = document.createElement('td');
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
body.append($table);
body.append($result);

const checkWinner = (e) =>{
  let rowIndex = 0;
  let cellIndex = 0;
  let winner = false;
  rows.forEach((row,i)=>{
    row.forEach((cell,j)=>{
      if(cell === e.target){
        [rowIndex, cellIndex] = [i,j]
      }
    })
  })
  // 가로 검사
  if(rows[rowIndex][0].textContent === turn && rows[rowIndex][1].textContent === turn && rows[rowIndex][2].textContent === turn){
    winner = true
  }
  // 세로 검사
  if(rows[0][cellIndex].textContent === turn && rows[1][cellIndex].textContent === turn && rows[2][cellIndex].textContent === turn){
    winner = true
  }
  // 대각선 검사
  if(rows[0][0].textContent === turn && rows[1][1].textContent === turn && rows[2][2].textContent === turn){
    winner = true
  }
  if(rows[0][2].textContent === turn && rows[1][1].textContent === turn && rows[2][0].textContent === turn){
    winner = true
  }
  return winner
}
// 끝날 시 이벤트리스너 remove하기 위해 또 써야하니까 애초에 함수로 빼내기
const callback = (e) =>{
  // 빈 칸인지 검사하기
  if(e.target.textContent !== ''){
    $result.textContent = '이미 선택된 자리입니다.'
    return
  }
  // 현재 플레이어
  currentPlayer = turn === 'O' ? 'Player1' : 'Player2'
  console.log(currentPlayer);

  // td태그에 turn 넣기
  e.target.textContent = turn
  
  // 승패 판단
  //checkWinner안에서 result를 정해주고 return을해버려도 callback이 끝나는게 아니기때문에 result가 빈값이 됨. -> checkWinner에서 값을 받아오고 callback에서 return하자.
  const winner = checkWinner(e);
  if(winner){
    $result.textContent = `${currentPlayer}님이 승리하셨습니다.`
    $table.removeEventListener('click',callback) // callback 함수를 클릭하는 이벤트를 없애겠다. 
    return 
  }
  // 무승부 판단 : 9칸 모두 다차면 -> 1칸이라도 남아있으면
  let draw = true;
  rows.forEach((row)=>{
    row.forEach((cell)=>{
      if(!cell.textContent){
        draw = false;        
      } 
    })
  })
  if(draw){
    $result.textContent = '무승부 입니다.'
    $table.removeEventListener('click',callback);
    return
  }
  // 클릭이 완료될 시 result 창 지우기
  $result.textContent = '';
  
  // 턴 넘기기
  turn = turn === 'O' ? 'X' : 'O'
}

$table.addEventListener('click', callback)
