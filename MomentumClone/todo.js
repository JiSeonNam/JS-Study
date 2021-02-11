const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";
let toDos = []; //toDoList에 추가될 경우 toDos에 array 데이터로 추가하기



//HTML에서 toDoList 지우기
function deleteTodo(event){
    const index = event.target.parentNode; //delete 버튼의 부모 li의 index 알아내기
    toDoList.removeChild(index);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //string을 숫자로 바꾸기
    });
    toDos = cleanToDos;
    saveToDos(); //바뀐 toDoList 저장하기
}

//toDos을 localStorage에 저장하기
function saveToDos(toDoObj){
    //Object 타입을 String으로 저장하기
    localStorage.setItem("TODOS_LS", JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li"); //element 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; 

    delBtn.innerText = "❌"; //버튼안에 이모티콘 넣기
    delBtn.addEventListener("click", deleteTodo); //클릭이벤트 발생
    span.innerText = text;
    li.appendChild(span); //li container안에 span(text)와 delete버튼 넣기
    li.appendChild(delBtn); 
    li.id = newId;
    toDoList.appendChild(li); //appendChild : toDoList의 자식노드리스트 중 마지막 자식으로 붙이기
    const toDoObj = {
        text: text,
        id: newId //li의 index번호를 주기 위해 
    };
    toDos.push(toDoObj); //toDos에 toDoObj 넣기
    saveToDos(toDoObj);
}

function handleSubmit(event){
    event.preventDefault(); //누르면 값 사라지는 default값 없애기
    const currentValue = toDoInput.value; //입력값 가져오기
    paintToDo(currentValue); //입력값 함수에 넣기
    toDoInput.value = ""; //입력값 초기화
}

//localStorage에서 TODOS_LS 가져오기
function loadToDos(){
    const loadedToDos = localStorage.getItem("TODOS_LS");
    if(loadedToDos !== null){
        //JSON을 string으로 가져오기
        const parsedToDos = JSON.parse(loadedToDos);

        //가져온 parsedToDos를 forEach로 주어진 함수 배열 요소 각각에 대해 실행하기
        parsedToDos.forEach(function(loadList){
            paintToDo(loadList.text); //string으로 가져온 것 중 text만 나열하기 위해 
        });
    }
}

//html load시 실행함수
function init(){
    loadToDos(); 
    toDoForm.addEventListener("submit", handleSubmit); //form submit 할 경우 handleSubmit함수 실행
}
init();