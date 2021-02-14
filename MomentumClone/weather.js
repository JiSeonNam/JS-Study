//현재위치에 있는 날씨 불러오기
const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "e9061cdbe59f28d8149afc1d389e2ff2";

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

//위치정보 저장
function saveCoords(coordsObj){
    //JSON으로 string 저장하기
    localStorage.setItem("COORDS", JSON.stringify(coordsObj));
}

//위치정보 확인O
function handleGeoSuccess(position){
    //position 객체의 coords 이용해서 위도, 경도값 가져오기
    const latitude = position.coords.latitude; //위도
    const longitude = position.coords.longitude; //경도

    //Object에 넣기
    coordsObj = {
        //key, value값이 같을 경우 value값 생략가능
        latitude,
        longitude
    };
    saveCoords(coordsObj); //위치정보 저장
    getWeather(latitude, longitude);
}

//위치정보 확인X
function handleGeoError(){
    console.log("Can't access geo location");
}

//현재 위치 가져오는 함수
function askForCoords(){
    //getCurrentPosition(좌표 가져오길 성공했을 때 처리하는 함수, 좌표 가져오길 실패했을 때 처리하는 함수)
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    //handleGeoSuccess();
}

//localStorage에서 위치정보 가져오기
function loadCoords(){
    const loadedCoords = localStorage.getItem("COORDS");
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

//실행함수
function init(){
    loadCoords();
}
init();
