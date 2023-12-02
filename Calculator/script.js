// numOne, numTwo 따로 저장하기
// 숫자보다 연산자를 입력하면 alert
let numOne = '';
let numTwo = '';
let operator = '';
const $operatorScreen = document.querySelector('#operatorScreen');
const $operator = document.querySelectorAll('#plus,#minus,#divide,#multiply');
const $result = document.querySelector('#result');
const $num = document.querySelectorAll('.num');
const $calculate = document.querySelector('#calculate');
const $clear = document.querySelector('#clear');

const onclickNumber = (event) => {
  if(!operator){
    numOne += event.target.textContent;
    $result.value += event.target.textContent;
    return
  }
  if(!numTwo){
    $result.value= '';
  }
  numTwo += event.target.textContent;
  $result.value += event.target.textContent;
}

const onclickOperator = (event) => {
  if(!numOne) alert("숫자를 먼저 입력하세요.");

  else{
    operator = event.target.textContent;
    $operatorScreen.value = event.target.textContent;
  }
}

$calculate.addEventListener('click', ()=>{
  if(numTwo){
    switch(operator){
      case '+' :
        $result.value = +numOne + +numTwo;
        break;
      case '-' :
        $result.value = +numOne - +numTwo;
        break;
      case 'x' :
        $result.value = +numOne * +numTwo;
        break;
      case '/' :
        $result.value = +numOne / +numTwo;
        break;
      default:
        break;
    }
    numOne = $result.value;
    operator = '';
    $operatorScreen.value = '';
    numTwo='';
  }
  else{
    alert('숫자를 먼저 입력하세요.');
  }
})
$num.forEach(v=>{
  v.addEventListener('click',onclickNumber)
})

$operator.forEach(v=>{
  v.addEventListener('click',onclickOperator);
})

$clear.addEventListener('click', ()=>{
  operator = '';
  numOne = '';
  numTwo = '';
  $result.value = '';
  $operatorScreen.value = '';
})
