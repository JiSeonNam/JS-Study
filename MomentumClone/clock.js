const clockContainer = document.querySelector(".js-clock");
const dayTitle = clockContainer.querySelector("h2");
const clockTitle = clockContainer.querySelector("span");

//현재 시각을 표시하는 함수
function realTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours<10?`0${hours}`:hours}:${
                            minutes<10?`0${minutes}`:minutes}:${
                            seconds<10?`0${seconds}`:seconds}`;
    
    //setTimeout 함수를 이용해 1초마다 realTime 함수를 재실행
    setTimeout("realTime()",1000);
}

function init(){
    realTime();
}
init();