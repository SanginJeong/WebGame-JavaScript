// 1~45까지의 숫자가 든 배열 candidate를 만든다.
// candidate에서의 랜덤 인덱스를 shuffle에 넣는다. shuffle = 1~45까지의 랜덤
// shuffle에서 0~6 인덱스의 숫자를 뽑고 오름차순 정렬. 인덱스 6은 보너스공
// result태그에 appendchild 한다.
const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');
const $auto = document.querySelector('#auto');
const $self = document.querySelector('#self');
const $myResult = document.querySelector('#myResult');
const $myBonus = document.querySelector('#myBonus');
const $plus = document.createElement('i');
const $myPlus = document.createElement('i');
const $form = document.querySelector('#form');
const $inputNumber = document.querySelector('#inputNumber');

const candidate = Array(45).fill(0).map((v,i)=>i+1);
// console.log(candidate);
let shuffle = [];
let myAnswer = [];
let mywinBalls = undefined;
let mybonusBalls = 0;

while(candidate.length>0){
  let index = ~~(Math.random()*candidate.length);
  let randomArray =candidate.splice(index, 1);
  shuffle.push(randomArray[0]);
}
// console.log(shuffle);
const winBalls = shuffle.slice(0,6).sort((a,b)=>a-b);
let bonusBall = shuffle[6];
// console.log(winBalls,bonusBall);

function drawBall($parent, number){
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = number;
  inputColor(number,$ball);
  $parent.appendChild($ball);
}

function drawAnswer(){
  for(let i=0; i<winBalls.length; i++){
    setTimeout(()=>{
      drawBall($result,winBalls[i]);
      drawBall($myResult,myAnswer[i]);
    },(i+1)*1000)
  }
  setTimeout(()=>{
    $plus.className = 'fa-solid fa-plus'
    $bonus.appendChild($plus);
    drawBall($bonus,bonusBall);
    $myPlus.className = 'fa-solid fa-plus'
    $myBonus.appendChild($myPlus);
    drawBall($myBonus,mybonusBalls);
  },7000)
}
// 자동 버튼 누를 시 아래 코드 실행
function randomMyAnswer(){
  const candidate = Array(45).fill(0).map((v,i)=>i+1);
  while(candidate.length>0){
    let index = ~~(Math.random()*candidate.length);
    let randomArray =candidate.splice(index, 1);
    myAnswer.push(randomArray[0]);
  }
  mywinBalls = myAnswer.slice(0,6).sort((a,b)=>a-b);
  mybonusBalls = myAnswer[6];
  console.log(mywinBalls,mybonusBalls);
}
// 색깔 입히기
const inputColor = (number,$tag) =>{
  if(number<10){
    $tag.style.backgroundColor = 'red';
  }
  else if(number<20){
    $tag.style.backgroundColor = 'orange';
  }
  else if(number<30){
    $tag.style.backgroundColor ='yellow';
  }
  else if(number<40){
    $tag.style.backgroundColor = 'green';
    $tag.style.color = 'white';
  }
  else{
    $tag.style.backgroundColor = 'blue';
    $tag.style.color = 'white';
  }
}

$auto.addEventListener('click',()=>{
  $result.textContent = '이번주 정답 : '
  $myResult.textContent='나  의 정답 : '
  randomMyAnswer();
  drawAnswer();
  compareAnswer(winBalls,myAnswer);
  $auto.disabled = true;
  $self.disabled = true;
})

$self.addEventListener('click',()=>{
  $auto.disabled = true;
  $self.disabled = true;
  $form.classList.remove('hidden');
  
})

$inputNumber.addEventListener('input', ()=>{
  const value = $inputNumber.value;
  const maxLength = 2;
  if(value.length > maxLength){
    $inputNumber.value = value.slice(0,maxLength);
  }
})
const $answerBalls = document.querySelector('.answerBalls');
$form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if($inputNumber.value <1 || $inputNumber.value>45){
    alert(`1~45까지의 숫자만 입력하실 수 있습니다.`);
    return
  }
  if(myAnswer.length<6){
    myAnswer.push(+$inputNumber.value);
  }
  else if(myAnswer.length ===6){  
    mybonusBalls = +$inputNumber.value;
    alert('수동 입력이 완료되었습니다.');
    $form.classList.add('hidden');
    $answerBalls.appendChild($showResult);
    myAnswer.sort((a,b)=>a-b);
  }
  $inputNumber.value='';
  console.log(myAnswer,mybonusBalls);
})

const $showResult = document.createElement('button');
$showResult.id = 'showResult';
$showResult.textContent = '결과 보기';

$showResult.addEventListener('click',()=>{
  $answerBalls.removeChild($showResult);
  $result.textContent = '이번주 정답 : '
  $myResult.textContent='나  의 정답 : '
  drawAnswer();
})

// 정답 비교하는 함수
function compareAnswer(array1,array2){
  const answer = array1.filter(v=>{
    v===array2.includes(v);
  }).length;

  const $answer = document.createElement('div');
  $answer.textContent = `${answer}개 맞추셨네요 1등입니다.`
  $answerBalls.appendChild($answer);
}

/*
고쳐야 할거
1. 정답비교하는 함수에서 자리와 위치 모두 맞도록
2. compareAnswer 쓰려면 myAnswer도 수정해야함.
 myAnswer는 45개의 배열이기 때문에 그중에서 검사한다..
*/