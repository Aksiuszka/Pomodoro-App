const workTime = document.querySelector('.work-time');
const breakTime = document.querySelector('.break-time');
const sessionTime = document.querySelector('.session-time');
const minusBreak = document.getElementById('minusBreak');
const addBreak = document.getElementById('addBreak');
const timedisplay = document.getElementById('display');
const typeDisplay = document.getElementById('type');
const start = document.querySelector('#playshit');
const restartBtn = document.querySelector('#resetTime');
const pauseBtn = document.querySelector('#pauseTime');
const songWork = document.querySelector('.song');
const songBreak = document.querySelector('.song2');

// handling events

minusBreak.addEventListener('click', decreaseBreakLength);
addBreak.addEventListener('click', increaseBreakLength);
minusWork.addEventListener('click', decreaseWorkLength);
addWork.addEventListener('click', increaseWorkLength);
start.addEventListener('click', determineNumberofSessions);
restartBtn.addEventListener('click', restart);
pauseBtn.addEventListener('click', organizePause);
minusSession.addEventListener('click', decreaseSessionLength);
addSession.addEventListener('click', increaseSessionLength);

//Handling useful variables which here display some default values
let isPaused = false;
let workSession = true;
let pausedTime =0;
let workLength = 25;
let breakLength= 5;
let isWork = true;
let isStopped = true;
workTime.innerHTML = 25;
breakTime.innerHTML = 5;
sessionTime.innerHTML=1;
timedisplay.innerHTML= "25:00";
let timeInterval = false;
let sessionLength =1;

function determineNumberofSessions (){
	if(sessionLength>0){
		startCount();
	}
	else{
		alert("Liczba sesji została wyczerpana. Ustaw większą liczbę sesji");
	}
}

function stop(){
	workLength = 0;
	breakLength = 0;
	update();
	clearInterval(timeInterval);
	timeInterval=false;
	songBreak.pause();
	songWork.pause();
	typeDisplay.textContent="Koniec sesji!";

}

function reset(){
console.log("reset");
timeInterval = false;
workSession = true;
pausedTime =0;
isPaused = false;
isStopped = true;
}
function update(){
	sessionTime.innerHTML = sessionLength;
	workTime.innerHTML = workLength;
	breakTime.innerHTML = breakLength;
	timedisplay.innerHTML = workLength + ":00";
	reset();
}
function increaseSessionLength() {
	if (sessionLength <= 24) {
		console.log('mniejsze rowne niz 20');
		sessionLength++;
		update();
	}
}

function decreaseSessionLength(){
	if(sessionLength>0){
		sessionLength--;
		update();
	}
}

function increaseBreakLength() {
	if (breakLength <= 20) {
		console.log('mniejsze rowne niz 20');
		breakLength++;
		update();
	}
}

function decreaseBreakLength(){
	if(breakLength>0){
		breakLength--;
		update();
	}
}
function increaseWorkLength() {
	if (workLength <= 60) {
		console.log('mniejsze rowne niz 60');
		workLength++;
		update();
	}
}

function decreaseWorkLength(){
	if(workLength>0){
		workLength--;
		update();
	}
}
function showIfWork(){
	if(workSession === true){
		typeDisplay.innerHTML = "Praca";
		songWork.play();
		songBreak.pause();
	}
	else{
		typeDisplay.innerHTML = "Przerwa";
		songWork.pause();
		songBreak.play();
		if(sessionLength>0){
			sessionLength--;
		}
		else{
			sessionLength=0;
			stop();
		}
		update();
		
	}
}

function startCount(){
	showIfWork();
	startTime = new Date().getTime();
	if(isPaused=== false){
		if(workSession===true){
			endTime = startTime + (workLength*60000);
		}
		else{
			endTime = startTime + (breakLength*60000);
		}
	}
	else{
		endTime = startTime + pausedTime;
		isPaused=true;
	}
	timeInterval = setInterval(updateCounting, 1000);

}
function updateCounting(){
	let timeNow = new Date().getTime();
	let timeDifference = endTime - timeNow;
	let minute = Math.floor((timeDifference/1000)/60%60);
	let second = Math.floor((timeDifference/1000)%60);
	if(second < 10){
		console.log("qwerty");
		second = "0" + second;
	}
	if(timeDifference > 1000){
		console.log("czemu nie wyswietlasz????");
		timedisplay.innerHTML = `${minute}:${second}`;	
	} else{
		organizeWorkFlow();
	}
}
function organizeWorkFlow(){
	clearInterval(timeInterval);
	if(workSession===true){
		workSession=false;
	} else{
		workSession= true;
	}
	timeInterval=false;
	startCount();
}
function restart(){
	workLength = 25;
	breakLength = 5;
	clearInterval(timeInterval);
	update();
}
function pauseCounting(){
	let timeNow = new Date().getTime();
	pausedTime=endTime-timeNow;
	isPaused=true;
	clearInterval(timeInterval);
	timeInterval=false;
	songBreak.pause();
	songWork.pause();
	pauseBtn.textContent="Wznów";
}
function organizePause(){
	if(!isPaused){
		pauseCounting();
	} 
	else{
		pauseBtn.textContent="Zatrzymaj";
		startCount();
		isPaused=!isPaused;
	}
}