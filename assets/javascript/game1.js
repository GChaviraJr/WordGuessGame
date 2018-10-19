// Variables

var wins = 0;
var losses = 0;

var maxErrors = 9;



var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");
var alertElement = document.getElementById("alerts");
var lostElement = document.getElementById("lost");
var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

var youWin = "You Win!!!";
var youLose = "Failure!";
var emptyAlert = "";


// Pressing keyboard letters 
var game = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}

// Word List
function Hangman() {
	this.wordList = [
		"pikachu",
		"squirtle",
		"charmander",
		"pidgey",
		"oddish",
		"voltorb",
		"jigglypuff",
		"weedle",
		"mewtwo",
	]

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	this.alertElement = emptyAlert;
	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

//Check guesses

Hangman.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		losses++;
		this.lostElement = youLose;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.alertElement = youWin;
		this.gameOver = true;
	}

	game.updatePageData();
};


Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;

	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;


}

game.updatePageData();