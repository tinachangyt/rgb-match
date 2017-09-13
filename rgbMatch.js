var numCircles = 6;
var colours = [];
var pickedColour;
var circles = document.querySelectorAll(".circle");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("header");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


//when the page loads, call function init.
function init() {
	setUpModeButtons();
	setUpCircles();
	reset();
}

function setUpCircles() {
	for(var i = 0; i < circles.length; i++) {
		//add click listeners to circles
		circles[i].addEventListener("click", function() {
			//grab colour of clicked circle
			var clickedColour = this.style.backgroundColor;

			//compare colour to picked colour.
			if(clickedColour === pickedColour) {
				// alert("correct");
				messageDisplay.textContent = "Correct";
				changeColours(clickedColour);
				header.style.backgroundColor = clickedColour;
				resetButton.textContent = "Play Again";
			} else {
				// alert("wrong");
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "transparent";
			}
		});
	}
}

function setUpModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numCircles = 3;
			} else {
				numCircles = 6;
			}
			reset();
		});
	}
	resetButton.addEventListener("click", function() {
		reset();
	});
}

function reset() {
	resetButton.textContent = "New Colours";
	//generate all new colours
	colours = generateRandomColours(numCircles);
	//pick a new random colour from array
	pickedColour = pickColour();
	//change colourDisplay to match picked Colour
	colourDisplay.textContent = pickedColour;
	//change colours of circles
	for(var i = 0; i < circles.length; i++) {
		//if there's a colour, change the background colour of circles.
		if (colours[i]) {
			circles[i].style.display = "block";
			circles[i].style.backgroundColor = colours[i];
		} else {
			circles[i].style.display = "none";
		}
	}
	header.style.backgroundColor = "#E0EAFC";
	messageDisplay.textContent = "";
}

function changeColours(colour) {
	//loop through all circles 
	for(var i = 0; i < circles.length; i++){
		//change each colour to match given colour
		circles[i].style.backgroundColor = colour;
	}
}

function pickColour() {
	var randomIndex = Math.floor(Math.random() * colours.length);
	return colours[randomIndex];
}

function generateRandomColours(num) {
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random colour and push into arr
		arr.push(randomColour());
	}

	//return that array
	return arr;
}

function randomColour() {
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 255 + 1);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 255 + 1);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 255 + 1);
	return `rgb(${r}, ${g}, ${b})`;
}


init();