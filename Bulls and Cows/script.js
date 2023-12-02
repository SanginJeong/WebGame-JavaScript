/*
-무작위로 숫자 네 개를 뽑는다.
-답을 제출한다.
-답이 형식에 맞는지 검사한다. No: 에러를 표시한다. Yes: 홈런인지 검사한다.
-홈런인가? No : 10번 시도했는가? Yes : 홈런이라고 표시하고 끝
-10번시도했는가? No : 몇볼 몇스트라이크인지 표시한다. Yes: 졌다고 표시한다.
-몇볼몇스트라이크 인지 표시한 후 시도횟수를 1 늘린다.
*/
const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $logs = document.querySelector('#logs');
const $reset = document.querySelector('#reset');


// 0~9까지의 수가 담긴 배열
const numbers = Array(10).fill(0).map((v,i)=>v+i);
console.log(numbers);
// 정답이 담길 배열 (숫자 중복 안됨)
const answer = [];
// 인덱스를 랜덤으로 골라서 배열[인덱스]를 정답 배열에 넣음.
for(let i=0; i<4; i++){
  const index = ~~(Math.random()*numbers.length); //0~9 사이의 랜덤 숫자
  answer.push(numbers[index]);
  numbers.splice(index,1); // 뽑은 수는 numbers에서 제거해줌
}
console.log(answer);

// 답안제출 이벤트 달기
const tries = [];
$form.addEventListener('submit',(event)=>{
  event.preventDefault(); // enter, 확인 눌려도 새로고침 안됨.
  const value = $input.value;
  $input.value = '';
  const valid = checkInput(value); //검사할 때 써야하기 때문에 변수선언
  //홈런인지 검사하기
  //checkInput(value) 함수에서 조건에 문제가 있다면 return으로 끝냄
  if(!valid) return;
  if(answer.join('')===value){
    $logs.appendChild(document.createTextNode(`${value} : 홈런! 정답입니다. ${tries.length+1}번 만에 맞췄습니다. 게임을 다시시작하려면 새로고침을 누르세요.`));
    return;
  }
  if(tries.length>=9){ //10번째 시도할때는 아직 안넣어서 length는 9임
    $logs.appendChild(document.createTextNode(`패배 ㅠㅠ 정답은 ${answer.join('')}입니다.`));
    return;
  }
  //볼 스트라이크 검사하기 : 맞는숫자가 하나도 없다 -> out 숫자는 맞는데 자리가 틀리다 ->ball 숫자와 자리 모두 맞다 -> strike
  let ball = 0;
  let strike = 0;
  answer.forEach((v,i)=>{
    const index = value.indexOf(String(v)); //한 배열에서의 값을 다른 배열에서 찾을때 indexOf 를 이용한다. 없으면 -1이 리턴되니까
    if(index > -1){ // 숫자가 있으면
      if(index === i){
        strike++;
      }
      else ball++;
    }
  })
  // OUT 검사하기
  if(strike === 0 && ball === 0){
    $logs.append(document.createTextNode(`${value} : OUT!!`),document.createElement('br'));
  }
  else $logs.append(document.createTextNode(`${value} : ${ball}볼 ${strike}스트라이크`),document.createElement('br'));
  
  tries.push(value);
  console.log(tries);
})
// 답안 제출 입력값 검사 함수
function checkInput(input){
  if(input.length !== 4){
    return alert("4자리 숫자를 입력하세요.");
  }
  if([...new Set(input)].length !== 4){ //size와 length의 차이 알기
    return alert("중복없이 숫자를 입력하세요.");
  }
  if(tries.includes(input)){
    return alert("이미 제출한 숫자입니다.");
  }
  return true
}

