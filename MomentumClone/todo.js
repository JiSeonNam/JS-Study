//to do list 함수
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
let arrList = []; //toDoList에 추가될 경우 array 데이터로 추가하기

//원하는 list 지우기
function delToDoList(event){
    const delLi = event.target.parentNode; //delBtn의 부모 li 알아내기
    toDoList.removeChild(delLi); //ul 태그의 자식노드에 해당하는 것 화면상에서 지우기

    //localStorage에 저장한 특정 list 지우기
    const delOneList = arrList.filter(function(element){
        //arrList의 element 중 index값과 delLi li의 id값이 같지 않다면 true 반환
        //delLi.id의 값을 string -> number로 변환, 데이터타입이 다를 경우 서로 다른 것으로 인식
        return element.index !== parseInt(delLi.id);
    });
    arrList = delOneList; //현재 arrList에 delOneList를 대입한 뒤
    saveToDoList(); //다시 localStorage에 저장
}


//입력한 값 localStorage에 저장하기
function saveToDoList(toDoObj){
    //Object -> string을 변환
    localStorage.setItem("TODOLIST", JSON.stringify(arrList));
}

//입력한 값 화면에 보여주는 함수
function showList(text){
    //ul 태그 안에 li 안에 button, span 함수 생성
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", delToDoList); //delete버튼 클릭이벤트 발생
    const span = document.createElement("span");
    const index = arrList.length + 1;

    delBtn.innerText = "❌"; //버튼안에 X표시
    span.innerText = text; //span안에 입력값 넣기
    //입력한 값은 li의 맨 마지막에 추가해야함
    li.appendChild(span); 
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    li.id = index; //li에 index번호 부여하기

    //arrList에 Object 형식으로 넣기위해 만들기
    const toDoObj = {
        index: index, //li의 index
        content: text //list의 내용
    };
    arrList.push(toDoObj); //arrList에 넣기
    saveToDoList(toDoObj); //localStorage에 저장하기
}

//form 태그 이벤트처리 함수
function handleSubmit(event){
    event.preventDefault(); //form 태그 default 이벤트 없애기
    const currentValue = toDoInput.value; //입력값 
    showList(currentValue); //함수에 넣기
    toDoInput.value = ""; //입력값 초기화
}

//localStorage에 to do list 가져오기
function loadList(){
    //JSON을 string으로 가져오기
    const loadList = JSON.parse(localStorage.getItem("TODOLIST"));
    if(loadList !== null){
        loadList.forEach(function(element){ //forEach로 요소 나열하기
            showList(element.content); //html에 content 표시, 만약 element만 기입할 경우 Object로만 표시
        });
    }
}

//html load
function init(){
    //저장된 to do list함수 불러오기
    loadList();
    //form 태그 이벤트 전송
    toDoForm.addEventListener("submit", handleSubmit);
}
init();
