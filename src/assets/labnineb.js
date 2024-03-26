/*

    @author Joao Cordio

    LAB 9

	- Take the previously created Rock Paper Scissors application and allow the user to play 3 times.

	Bonus: The game should stop if the user wins

	Bonus: The computer should change their guess each time

*/ 

//Main Function of Playing
function play(){

	//Get options Player (manually) and Computer (Automatically) - Rock is 1, Paper is 2, and Scissors is 3
	var player = document.getElementById("player").value;	
	var computer = getRandom();
	var success = true;
	var chances = 3;

	//alert("before while: " + chances);
	//alert(success);
	//alert(!success);
	//return;
	//alert(chances);
	//document.getElementById("chance").innerHTML = chances;
	
	while(chances > 0){
		
		//Hide select Options
		document.getElementById("player").className  = "d-none";

		getComputerOption(computer);
		computer = 2; //using for test, remove later

		//Check the winner
		if((player == 1 && computer == 3) || (player == 2 && computer == 1) || (player == 3 && computer == 2)){

			document.getElementById("alertWin").className  += "d-block";
			showWinPage();
			return;
			
		}else if ((player == 1 && computer == 2) || (player == 2 && computer == 3) || (player == 3 && computer == 1)){

			document.getElementById("alertLose").className  += "d-block";
			success = false;

		}else if ((player == 1 && computer == 1) || (player == 2 && computer == 2) || (player == 3 && computer == 3)){
			
			document.getElementById("alertDraw").className  += "d-block";
			success = false;

		}else{
			//If invalid resert options to the default and let player knows	
			playAgain()
			alert("Please select at least one option.");		
			return false;
		}	
		//Hide and Show buttons: Play and Again?
		document.getElementById("buttonPlayAgain").className  = "";
		document.getElementById("buttonPlay").className  = "d-none";	
		
		if(!success){
			chances = chances - 1;
		}

		if (chances == 0){			
			showLoserPage();
			return;
		}
		
	}
	
}

//Clicking on "Again?" set everything as default
function playAgain(){
	setDefaultComputer();
	setDefaultAlerts();
	document.getElementById("playerOption").src="imgs/blue-question-mark.png";
	document.getElementById("player").value  = 0;
	document.getElementById("player").className  = "";
	document.getElementById("buttonPlayAgain").className  = "d-none";
	document.getElementById("buttonPlay").className  = "";

}

//Return a randon number: 1, 2 or 3
function getRandom(){
	return Math.floor(Math.random() * 3) + 1;
}

//Set Player's option image
function getPlayerOption(){

	//Get player Option
	var player = document.getElementById("player").value;
	var img = "";

	//select the correct image
	if(player == 0){
		img = "imgs/blue-question-mark.png";
	}else if(player == 1){
		img = "imgs/rock-blue.png";
	}else if(player == 2){
		img = "imgs/paper-blue.png";
	}else if (player == 3){
		img = "imgs/scissors-blue.png";
	}else{
		alert("Sorry, something went wrong!");
	}
	
	//set image
	document.getElementById("playerOption").src=img;
	
}

//Set Computer's option image
function getComputerOption(computer){

	var img = "";

	if(computer == 0){
		img = "imgs/red-question-mark.png";
	}else if(computer == 1){
		img = "imgs/rock-red.png";
	}else if(computer == 2){
		img = "imgs/paper-red.png";
	}else if (computer == 3){
		img = "imgs/scissors-red.png";
	}else{
		alert("Sorry, something went wrong!");
	}

	document.getElementById("computerOption").src=img;
	
}

//Reset the Alerts to the Default Options
function setDefaultAlerts(){
	document.getElementById("alertWin").className  = "alert alert-primary d-none";
	document.getElementById("alertLose").className  = "alert alert-danger d-none";
	document.getElementById("alertDraw").className  = "alert alert-warning d-none";
}

//Reset Computer Option
function setDefaultComputer(){
	document.getElementById("computerOption").src="imgs/red-question-mark.png";
}

function showWinPage(){

	document.getElementById("gameTitle").innerHTML = "<div class='row justify-content-around text-center mt-5'>" +
	"<div class='col-12'>" +
		"<div id='alertWin' class='alert alert-primary' role='alert'>" +
			"Congratulations! YOU WIN!" +
		"</div>" +
	"</div>" +
"</div>";

}

function showLoserPage(){

	document.getElementById("gameTitle").innerHTML = "<div class='row justify-content-around text-center mt-5'>" +
	"<div class='col-12'>" +
		"<div id='alertLose' class='alert alert-danger' role='alert'>" +
			"Not this time, YOU LOSE!" +
		"</div>" +
	"</div>" +
"</div>";

}

