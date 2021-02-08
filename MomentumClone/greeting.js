const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const userName = "nickName";
const SHOWING_ON = "showing";

//localStorage에 이름 저장하기
function saveName(text){
    localStorage.setItem(userName,text); 
}

//form 태그 안 이벤트 처리
function handleSubmit(event){
    event.preventDefault(); //기본 form 태그 event 발생 막기 - 화면 새로고침 방지
    const currentValue = input.value; //입력값 변수에 저장
    showGreeting(currentValue); //인사말 함수에 입력값 변수로 넘기기
    saveName(currentValue); //입력값 저장하는 함수 실행
}

//input 창 보여주기
function askForName(){
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit); //enter창(submit)를 하게 될 경우 submit 함수 실행
}

//인사말 보여주기
function showGreeting(text){
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`; 
}

//localStorage 정보 가져오기
function loadName(){
    const nickName = localStorage.getItem(userName);

    //userName 정보가 없을 경우
    if(nickName === null){
        askForName();        
    }else{
        showGreeting(nickName);
    }
}

function init(){
    loadName();
}
init();
