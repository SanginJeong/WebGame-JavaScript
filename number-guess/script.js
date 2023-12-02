/*
로직
-랜덤으로 정답이 설정된다. 1-100 까지의 정수
-게임시작 : 사용자가 입력창에 숫자를 입력하고, 제출버튼을 누른다.
-제출한 숫자가 정답이라면 게임 종료 -> 제출버튼 disabled , 알림: 정답입니다. 제출한 숫자가 정답보다 높다면 DOWN , 제출한 숫자가 정답보다 낮다면 UP
-제출 버튼을 누를 때 마다, 맞출 수 있는 기회가 한개씩 줄어든다. 총 기회는 5번 , 총 기회 < 1 이되면 역시 게임종료 -> 제출버튼 disabled
-reset 버튼을 누르면 게임이 리셋된다.
사용자를 위한 기능
- 1-100사이의 정수를 입력하지 않으면, 알림 -> 1-100사이의 정수를 입력하세요. , 기회가 줄어들지 않는다.
- history : 이전의 입력한 숫자와 같은 수를 입력하면 알림 -> 이미 입력한 숫자입니다 , 기회가 줄어들지 않는다.
- 입력창에 마우스를 focus 하면 즉 커서를 누르면 자동으로 숫자가 지워진다.
*/

let answer = 0;
let chance = 5;
let $userInput = document.querySelector('#userInput');
let $submitButton = document.querySelector('#submitButton');
let $result = document.querySelector('#result');
let $chanceArea = document.querySelector('#chanceArea');
let $reset = document.querySelector('#reset');

let history = [];

$submitButton.addEventListener('click', play);
$reset.addEventListener('click', reset);
$userInput.addEventListener('focus', function(){
    $userInput.value='';
});

function randomNumber(){
    answer = ~~(Math.random()*100)+1
    console.log('정답',answer);
}

function gameOver(){
    $submitButton.disabled = true;
    $chanceArea.textContent='';
    $result.textContent='게임오버!';
}

function reset(){
    randomNumber();
    $userInput.value='';
    $result.textContent ='숫자를 입력하면 게임이 시작됩니다.';
    $submitButton.disabled= false;
    chance=5;
    $chanceArea.textContent='';
    history=[];
}

function play(){
    let userValue = Number($userInput.value); // 유저가 입력한 값을 숫자로 저장

    if(userValue > 100 || userValue < 1){
        $result.textContent = '1~100 사이의 정수를 입력하세요';
        return;
    }
    if(history.includes(userValue)){
        $result.textContent='이미 입력한 숫자입니다.';
        return;
    }

    history.push(userValue);
    console.log(history);

    chance--;
    $chanceArea.textContent=`남은기회: ${chance} 번`

    if(userValue === answer){
        gameOver();
        $result.textContent='정답입니다!';
    }
    else if(userValue > answer){
        $result.textContent='DOWN!';
    }
    else{ $result.textContent='UP!' ;}

    if(chance === 0){
        gameOver();
    }
}

randomNumber();


