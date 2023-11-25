"use strict";

let computerChoice;
let userChoice;
let userScore = 0;
let computerScore = 0;
const text = document.querySelector(`.text`);
const buttons = document.querySelectorAll(`.button`);
const result = document.querySelector(`#result`);
let cheatStatus = false;

function cheatSwitch() {
	if (!cheatStatus) {
		cheatStatus = true;
	} else {
		cheatStatus = false;
	}
	cheatStatus &&
		console.warn(
			"Oh! Hello there, fellow cheater. 🙂\nYou can use this function to toggle the cheat and see the computer's choice, here in the console.\nTo disable the cheat, use this function again."
		);
	cheatStatus &&
		console.error(`CHEAT: Computer has chose ${translate(computerChoice)}`);
	document.querySelector(`#cheat`).style.display = cheatStatus
		? "block"
		: "none";

	return cheatStatus;
}

function loadComputerChoice() {
	computerChoice = Math.floor(Math.random() * 3);
}

function translate(input) {
	switch (input) {
		case 0:
			return `Rock`;
			break;
		case 1:
			return `Paper`;
			break;
		case 2:
			return `Scissors`;
			break;
		default:
			return `Error`;
			break;
	}
}

loadComputerChoice();

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", () => {
		userChoice = i;
		if (computerChoice === userChoice) {
			text.innerHTML = `<span style="color: green">Won!</span>`;
			userScore++;
		} else {
			text.innerHTML = `<span style="color: red">Lost.</span>`;
			computerScore++;
		}
		result.textContent = `Computer: ${computerScore} | User: ${userScore}.`;
		document.getElementById(
			"chose"
		).innerHTML = `Computer chose <em>${translate(
			computerChoice
		)}</em>, user chose <em>${translate(userChoice)}</em>.`;
		loadComputerChoice();
		buttons.forEach((button) => {
			button.classList.add("disabled");
		});
		console.info(`Computer: ${computerScore} | User: ${userScore}.`);
		console.log(
			`Computer: ${translate(computerChoice)} | User: ${translate(
				userChoice
			)}.\n`
		);
		document.querySelector("body").style.cursor = "wait";
		setTimeout(() => {
			buttons.forEach((button) => {
				button.classList.remove("disabled");
				document.querySelector("body").style.cursor = "";
			});
			text.textContent = "Choose again:";
		}, 1500);
		cheatStatus &&
			console.warn(`CHEAT: Computer has chose ${translate(computerChoice)}`);
	});
}
