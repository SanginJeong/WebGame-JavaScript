const $start_screen = document.querySelector('.start_screen');
const $choose_screen = document.querySelector('.choose_screen');
const $result_screen = document.querySelector('.result_screen');
const $game_start = document.querySelector('#game_start');
const $btns_rsp = document.querySelectorAll('#btn_rock, #btn_scissors, #btn_paper');
const $computer_pick = document.querySelector('.computer_pick');
const $user_pick = document.querySelector('.user_pick');
const $again = document.querySelector('#again');
const $confirm = document.querySelector('.confirm');
const $restart = document.querySelector('#restart');
const $countdown = document.querySelector('#countdown');
const $content = document.querySelector('#content');

$game_start.addEventListener('click',()=>{
  $start_screen.classList.add('hidden');
  $choose_screen.classList.remove('hidden');
})

const obj = [
  {
    id: '2',
    img : `<i class="fa-solid fa-hand-scissors"></i>`,
  },
  {
    id: '0',
    img : `<i class="fa-solid fa-hand-back-fist"></i>`,
  },
  {
    id: '5',
    img : `<i class="fa-solid fa-hand"></i>`,
  }
]

let userPick = '';

$btns_rsp.forEach((button)=>{
  button.addEventListener('click',(event)=>{
    if(event.currentTarget.id === 'btn_rock'){
      userPick = '0';
    }
    else if(event.currentTarget.id === 'btn_scissors'){
      userPick = '2';
    }
    else {userPick = '5';}
    console.log(userPick);
    $choose_screen.classList.add('hidden');
    $result_screen.classList.remove('hidden');
    target(userPick);
    startCountDown();
    random();
    judge();
  })
})
// 카운트다운
let countdownInterval;
function startCountDown(){
  let countdown = 3;
  clearInterval(countdownInterval)

  countdownInterval = setInterval(()=>{
    countdown--;
    $countdown.textContent = countdown;
    if(countdown === 0){
      clearInterval(countdownInterval);
      $countdown.style.display = 'none';
      $content.style.display = 'block';
    }
  },1000);
}

function target(targetID){
  let targetObj = {};
  obj.forEach(v=>{
    if(v.id === targetID){
      targetObj = v;
    }
  })
  const targetImg = targetObj.img;
  console.log(targetObj, targetImg);
  $user_pick.innerHTML += targetImg;
}

let randomtargetID = '';
function random(){
  let index = ~~(Math.random()*3);
  randomtargetID = obj[index].id;
  const targetImg = obj[index].img;
  $computer_pick.innerHTML += targetImg;
}

function judge(){
  if((userPick === '2' && randomtargetID === '0') 
  ||(userPick === '0' && randomtargetID === '5')
  || (userPick === '5' && randomtargetID === '2')){
    $confirm.textContent = 'YOU LOSE...';
    $restart.textContent = `Restart`;
  }
  else if((userPick === '2' && randomtargetID === '5')
  || (userPick === '0' && randomtargetID === '2')
  || (userPick === '5' && randomtargetID === '0')){
    $confirm.textContent = 'YOU WIN!!!';
    $restart.textContent = `Restart`;
  }
  else {
    $confirm.textContent = 'DRAW, Pick again';
    $restart.textContent = `Let's pick again`;
  }
}

$restart.addEventListener('click',()=>{
  $result_screen.classList.add('hidden');
  $choose_screen.classList.remove('hidden');
  $restart.classList.remove('hidden');
  $computer_pick.innerHTML = '';
  $user_pick.innerHTML = '';
  $confirm.textContent = '';
  $countdown.textContent = '3'; 
  $content.style.display = 'none'; 
  $countdown.style.display = 'inline-block';
})
// 가위바위보 게임 순서도

// 메인화면, 유저의 가위바위보 선택 화면, 결과화면 으로 나뉜다.
// 세 개의 큰 div를 만들어놓고, 선택화면, 결과화면은 안보이게 해놓는다.

// 메인화면
// 가위바위보 게임 시작하기 버튼
// - 버튼에 컸다가 작아졌다 하는 애니메이션 삽입 (검색)
// - 버튼 클릭 시 display none, 유저의 가위바위보 선택 화면이 display block

// 유저의 가위바위보 선택화면
// -가위,바위,보 중 선택하시오 라는 문구
// -가위, 바위, 보 세 개의 버튼
// -가위 = 2, 바위 = 0, 보 = 5 라는 id를 부여한 객체를 생성한다.
// -유저의 선택값을 선언한다.
// -예를들어, 클릭한 버튼이 가위이면, 유저의 선택값 = 2로 저장한다.
// -조건문 함수를 생성하고, 각 버튼의 클릭이벤트에서 실행하도록한다.
// -조건문 함수: 유저의 선택값과 객체프로퍼티의 value가 같은 객체를 골라서
// 그 객체의 이미지를 화면에 띄우는 함수

// 컴퓨터의 랜덤값
// 객체에서 랜덤으로 하나 골라서 id를 컴퓨터의 선택변수에 저장
// 그 id의 이미지를 화면에 띄우는 함수 -> 이함수는 유저의 선택버튼이
// 클릭 됐을 때 실행된다.

// 이겼는지 졌는지 비겼는지 판단하기
// 컴퓨터의 선택 === 유저의 선택값
// -> 비겼습니다. and 유저와 컴퓨터의 선택값 지우고, 다시 선택화면
// 띄우기
// 컴퓨터의 선택 === 2
// -> 유저의 선택 === 5 이면 win, 유저의 선택 === 0 이면 lose
// 컴퓨터의 선택 === ~~
// or 구문으로 한번에 줄일 수 잇을지도 생각해봐야겠다.
// 예를들어 컴퓨터 2 && 유저 5 || 컴퓨터 0 && 유저 2 || 컴퓨터 5
// && 유저 0 이면 win 이런식으로

// 결과화면
// 3,2,1 카운트 후 결과 발표
// 컴퓨터
//   vs
// 선택값
// 이겼습니다, 비겼습니다, 졌습니다.
// -> 비겼으면 다시 선택하는 화면으로
// -> 이기거나, 졌으면 게임 다시하기라는 버튼


