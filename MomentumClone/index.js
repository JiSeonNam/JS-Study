//온라인/오프라인 이벤트 
const currentWifi = () => {
    console.log(navigator.onLine?"안녕하세요🤗":"연결상태가 좋지 않네요🤷‍♂️");
}
window.addEventListener("online",currentWifi);
window.addEventListener("offline",currentWifi);
currentWifi();