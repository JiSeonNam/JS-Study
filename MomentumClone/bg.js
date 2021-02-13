//백그라운드 이미지 불러오기
const body = document.querySelector("body");
const IMG_NUMBER = 3;

//화면에 이미지 불러오는 함수
function paintImage(imgNumber){
    //이미지 태그 생성
    //1.객체를 생성해서 만들기
    //const image = new Image();
    //2.element(요소) 생성해서 만들기
    image = document.createElement("img");
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage"); //css추가
    body.prepend(image); //body 부모객체의 맨 앞에 image 추가
}

//랜덤 숫자 가져오는 함수
function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER)+1;
    return number; //랜덤 숫자 
}

//html 실행 함수
function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();