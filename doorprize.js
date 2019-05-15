window.addEventListener("DOMContentLoaded", domLoaded);

//Store the 4 game screens in the screens array for changing displays
var screens = [];

function domLoaded(){
	//Fill screens array
	screens.push(document.getElementById("startscreen"));
	screens.push(document.getElementById("contscreen"));
	screens.push(document.getElementById("racescreen"));
	screens.push(document.getElementById("winnerscreen"));
	
	//Set initial state
	changeState(0);
	
	//Add the button event listeners for each screen.
	//Start Screen Listeners
	document.getElementById("pickcont").addEventListener("click", pickContestants);
	
	//Cont Screen Listeners
	document.getElementById("racebutton").addEventListener("click", race);
	document.getElementById("cancelbutton").addEventListener("click", function(){changeState(0);});

	//Winner Screen Listeners
	document.getElementById("newracebutton").addEventListener("click", newRace);

}

//States
//0: Start screen
//1: Contestant screen
//2: Racing screen
//3: Winner screen
function changeState(state){
	if(state == 0){
		screens[0].style.display = "block";
		screens[1].style.display = "none";
		screens[2].style.display = "none";
		screens[3].style.display = "none";
	}
	else if(state == 1){
		screens[0].style.display = "none";
		screens[1].style.display = "block";
		screens[2].style.display = "none";
		screens[3].style.display = "none";
	}
	else if(state == 2){
		screens[0].style.display = "none";
		screens[1].style.display = "none";
		screens[2].style.display = "block";
		screens[3].style.display = "none";
	}
	else if(state == 3){
		screens[0].style.display = "none";
		screens[1].style.display = "none";
		screens[2].style.display = "none";
		screens[3].style.display = "block";
	}
	else{
		console.log("The game should not reach this point");
	}
}

//Function called to pick 4 contestants.
function pickContestants(){
	var names = document.getElementById("names").value;
	var parsedNames = names.split("\n");
	var usableNames = [];
	
	//Gets rid of empty names and trims the whitespace of usable names.
	for(var i = 0; i < parsedNames.length; ++i){
		parsedNames[i] = parsedNames[i].trim();
		if(parsedNames[i] != ""){
			usableNames.push(parsedNames[i]);
		}
	}
	
	if(usableNames.length >= 4){
		changeState(1);
		
		//Select 4 random names and assigns them each a position.
		var nameChosen = usableNames[Math.floor(Math.random() * usableNames.length)];
		usableNames.splice(usableNames.indexOf(nameChosen), 1);
		document.getElementById("cont1").innerHTML = '<img src="Pictures/cheetah.png" alt="cheetah" width="100" height="100">' + nameChosen;
		nameChosen = usableNames[Math.floor(Math.random() * usableNames.length)];
		usableNames.splice(usableNames.indexOf(nameChosen), 1);
		document.getElementById("cont2").innerHTML = '<img src="Pictures/rabbit.png" alt="rabbit" width="100" height="100">' + nameChosen;
		nameChosen = usableNames[Math.floor(Math.random() * usableNames.length)];
		usableNames.splice(usableNames.indexOf(nameChosen), 1);
		document.getElementById("cont3").innerHTML = '<img src="Pictures/sloth.png" alt="sloth" width="100" height="100">' + nameChosen;
		nameChosen = usableNames[Math.floor(Math.random() * usableNames.length)];
		usableNames.splice(usableNames.indexOf(nameChosen), 1);
		document.getElementById("cont4").innerHTML = '<img src="Pictures/turtle.png" alt="turtle" width="100" height="100">' + nameChosen;
	}
	else{
		alert("Please enter at least 4 usable names.");
	}
}

var winner = "";
var gameOverInterval;

function race(){
	//Switches to the racing display state.
	changeState(2);
	
	//Assign the racer their div object.
	var racers = [];
	racers.push(document.getElementById("racer1"));
	racers.push(document.getElementById("racer2"));
	racers.push(document.getElementById("racer3"));
	racers.push(document.getElementById("racer4"));
	
	//Assign each racer their animal picture.
	racers[0].innerHTML = '<img src="Pictures/cheetah.png" alt="cheetah" width="100" height="100">';
	racers[1].innerHTML = '<img src="Pictures/rabbit.png" alt="rabbit" width="100" height="100">';
	racers[2].innerHTML = '<img src="Pictures/sloth.png" alt="sloth" width="100" height="100">';
	racers[3].innerHTML = '<img src="Pictures/turtle.png" alt="turtle" width="100" height="100">';

	//Assigns the probability a racer will be able to move each call of moveRacers.
	var myChance = [];
	for(var i = 0; i < 4; ++i){
		myChance.push(Math.random());
	}
	
	//Initialization of the race interval.
	var raceInterval = setInterval(moveRacers, 10, racers, myChance);
	//Initialization of the game over check interval.
	gameOverInterval = setInterval(gameOver, 5, raceInterval);	
}

//Checks to see if anyone has won the race yet to clear the raceInterval and move on to the next state.
function gameOver(raceInterval){
	if(winner != ""){
		clearInterval(raceInterval);
		var audio = new Audio('Sounds/Applause.mp3');
		audio.volume = 0.15;
		audio.play();
		setTimeout(showWinner, 1500);
	}
}

//Function that moves each racer (sometimes)
function moveRacers(racers, myChance){
	for(var i = 0; i < 4; ++i){
		var holder = parseInt(racers[i].style.left);
		if(Math.random() > myChance[i]){
			holder++;
			racers[i].style.left = holder + "px";
		}
		if((window.innerWidth - 100) <= parseInt(racers[i].style.left)){
			winner = i + 1;
		}
	}
}

function showWinner(){
	clearInterval(gameOverInterval);
	document.getElementById("winnername").innerHTML = document.getElementById("cont" + winner).innerHTML
	changeState(3);
}

function newRace(){
	document.getElementById("racer1").style.left = "0px";
	document.getElementById("racer2").style.left = "0px";
	document.getElementById("racer3").style.left = "0px";
	document.getElementById("racer4").style.left = "0px";
	winner = "";
	changeState(0);
}
































