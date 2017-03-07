'use strict'
var allCharacters = {
	obi:character("Obi-Wan Kenobi", "obi", 140, "http://placehold.it/120x80", 
		null, attackFunc(5, 20), counterAttackFunc(15, 0)),
	darthSid:character("Darth Sidious", "darthSid", 100, "http://placehold.it/120x80", 
		null, attackFunc(10, 15), counterAttackFunc(14, 0)),
	darthMaul:character("Darth Maul", "darthMaul", 150, "http://placehold.it/120x80", 
		null, attackFunc(8, 13), counterAttackFunc(17, 0)),
	luke:character("LukeSkyWalker", "luke", 180, "http://placehold.it/120x80", 
		null, attackFunc(15, 5), counterAttackFunc(15, 0)),
}
var allCharNames = ['obi', 'darthSid', 'darthMaul', 'luke'];
var myCharacter = null;
var availableEnemies = [];
var defender = null;
var defeatedEnemies = [];

var starWarsThemeAudio, lightSaberClashAudio, lightSaberOnAudio; 


//Initialize the available characters list:

var charHtml = allCharacters["obi"].createHtmlContent("neutral");
$('#availableCharacters .row').append(charHtml);
charHtml = allCharacters["darthSid"].createHtmlContent("neutral");
$('#availableCharacters .row').append(charHtml);
charHtml = allCharacters["darthMaul"].createHtmlContent("neutral");
$('#availableCharacters .row').append(charHtml);
charHtml = allCharacters["luke"].createHtmlContent("neutral");
$('#availableCharacters .row').append(charHtml);

$('#myCharacter').hide();
$('#availableEnemies').hide();
$('#fightSection').hide();
$('#defender').hide();
$('#restart').hide();



//State machine: 
//0: have not chosen a character
//1: have chosen a character, have not chosen an enemy
//2: have chosen a enemy,and is fighting, fight until done move to state 3
//3: fight is done.  lose => show restart button gameState 5, win => gameState 4
//4: choose another character, reset current play health -> return to 1
//5: show restart, and if restart button is clicked, refresh page.  

//restartBtnClick 

var gameState = 0;

var RestartBtnClick = function() {
	if (gameState === 5 || gameState === 3) {
		location.reload();	
	}
	
}

var AttackBtnClick = function() {
	if(gameState === 2) {
		var myAttackHtml;
		var enemyCounterAttackHtml;
		var winLoseMessageHtml;
		var myAttackPoints = allCharacters[myCharacter].calcAttackPoints();
		var enemyAttackPoints = allCharacters[defender].calcCounterAttackPoints();
		myAttackHtml = "You attacked " + allCharacters[defender].getName() + " for " + myAttackPoints.toString() + " damaage";
		enemyCounterAttackHtml = allCharacters[defender].getName() + " attacked you for " + enemyAttackPoints.toString() + " damage";


		//Play the lightSaber fight sound, if necessary, stop the previous play. 
		lightSaberClashAudio.pause();
		lightSaberClashAudio.currentTime =0;
		lightSaberClashAudio.play();

		//Update the attack and attacked messages 
		$('#myAttack').text(myAttackHtml);
		$('#enemyCounterAttack').text(enemyCounterAttackHtml);


		allCharacters[myCharacter].setHealthUnit(allCharacters[myCharacter].getHealthUnit() - enemyAttackPoints);
		allCharacters[defender].setHealthUnit(allCharacters[defender].getHealthUnit() - myAttackPoints);

		console.log(myCharacter + " Health: " + allCharacters[myCharacter].getHealthUnit().toString());
		console.log(defender + " Health: " + allCharacters[defender].getHealthUnit().toString());

		//Update my character health and defender health
		$('#myCharacter .row').empty();
		var myCharHtml = allCharacters[myCharacter].createHtmlContent("neutral");
		$('#myCharacter .row').append(myCharHtml);

		$('#defender .character').remove();
		charHtml = allCharacters[defender].createHtmlContent('defender');
		$('#defender .row1').append(charHtml);


		if (allCharacters[myCharacter].getHealthUnit() <= 0) {
			//I lose
			console.log("I Lose");
			winLoseMessageHtml = "You have been defeated by " + allCharacters[defender].getName() + ", refresh to restart the game"
			$('#winLoseMessage').text(winLoseMessageHtml);
			gameState = 3;

			$('#restart button').click(RestartBtnClick);
			$('#restart').show();

		}
		else if (allCharacters[defender].getHealthUnit() <=0 ) {
			//I Win
			console.log("I Win");
			

			if(availableEnemies.length == 0) {
				//all enemies are defeated 
				gameState = 5;
				winLoseMessageHtml = "You have defeated all who come before you.  You are the chosen one!!!"
				$('#winLoseMessage').text(winLoseMessageHtml);
				$('#restart button').click(RestartBtnClick);
				$('#restart').show();
				starWarsThemeAudio.play();
			}
			else {
				//there are still enemies left. 
				winLoseMessageHtml = "You have defeated " + allCharacters[defender].getName() + ", you can choose to fight another enemy"
				$('#winLoseMessage').text(winLoseMessageHtml);
				allCharacters[myCharacter].resetHealthBackToInitial();
				allCharacters[myCharacter].resetAttackSpeed();

				gameState = 4;
			}
		}	
	}
}

var availableEnemiesClick = function() {
	if (gameState === 1 || gameState === 4) {
		//clear the winLoseMessage 

		$('#winLoseMessage').empty();
		$('#myAttack').empty();
		$('#enemyCounterAttack').empty();

		var data_tag = $(this).attr('data')
		console.log("selected enemy: " + data_tag)
		$('#fightSection').show();


		//clear and set the defender
		$('#defender .character').remove();
		defender = data_tag;
		charHtml = allCharacters[defender].createHtmlContent('defender');
		$('#fightSection button').click(AttackBtnClick);

		$('#defender .row1').append(charHtml);
		$('#defender').show();


		//refresh the display of my character
		$('#myCharacter .row').empty();
		var myCharHtml = allCharacters[myCharacter].createHtmlContent("neutral");
		$('#myCharacter .row').append(myCharHtml);

		//remove the selected enemy from the available enemies list. 
		$('#availableEnemies .character').remove();
		availableEnemies = _.without(availableEnemies, data_tag);
		for (var i in availableEnemies) {
			var charName = availableEnemies[i];
			charHtml = allCharacters[charName].createHtmlContent('evil');
			$('#availableEnemies .row').append(charHtml);
		}
		$('#availableEnemies .character').click(availableEnemiesClick)
		$('#availableEnemies').show();

		//get ready to fight. play the light saber turn on audio. 
		lightSaberOnAudio.play();
		gameState = 2;
	}
}



var yourCharacterClick = function() {
	var data_tag = $(this.attr('data'))
	console.log("yourcharacter: " + data_tag)

};

$("#availableCharacters .character").click(function() {
	if(gameState == 0) {
		var data_tag = $(this).attr('data');
		console.log("Chosen character: " + data_tag);
		//TODO: select your character
		myCharacter = data_tag;

		$('#availableCharacters').hide();

		var myCharHtml = allCharacters[myCharacter].createHtmlContent("neutral");
		$('#myCharacter .row').append(myCharHtml);
		$('#myCharacter').show();

		availableEnemies = _.without(allCharNames, data_tag);
		for (var i in availableEnemies) {
			var charName = availableEnemies[i];

			charHtml = allCharacters[charName].createHtmlContent('evil');
			$('#availableEnemies .row').append(charHtml);
		}
		$('#availableEnemies .character').click(availableEnemiesClick)
		$('#availableEnemies').show();
		gameState = 1;
	}
	
});


var fightSectionClick = function () {
	var data_tag = $(this).attr('data')
}
// $('#fightSection button').click()

var defenderClick = function() {
	var data_tag = $(this).attr('data')
	console.log("yourcharacter: " + data_tag)
}
$('#defender .character').click(function() {
	
})


$(document).ready(function() {

	lightSaberOnAudio = document.createElement('audio');
	lightSaberOnAudio.setAttribute('src', 'assets/audio/Lightsaber Turn On.mp3');

	lightSaberClashAudio = document.createElement('audio');
	lightSaberClashAudio.setAttribute('src', 'assets/audio/Lightsaber Clash.mp3');

	starWarsThemeAudio = document.createElement('audio');
	starWarsThemeAudio.setAttribute('src', 'assets/audio/star-wars-theme.mp3');

});