'use strict'
var allCharacters = {
	obi:character("Obi-Wan Kenobi", "obi", 120, "http://placehold.it/120x80", 
		null, attackFunc(5, 20), counterAttackFunc(15, 0)),
	darthSid:character("Darth Sidious", "darthSid", 100, "http://placehold.it/120x80", 
		null, attackFunc(10, 15), counterAttackFunc(20, 0)),
	darthMaul:character("Darth Maul", "darthMaul", 150, "http://placehold.it/120x80", 
		null, attackFunc(8, 13), counterAttackFunc(18, 0)),
	luke:character("LukeSkyWalker", "luke", 180, "http://placehold.it/120x80", 
		null, attackFunc(15, 5), counterAttackFunc(17, 0)),
}
var allCharNames = ['obi', 'darthSid', 'darthMaul', 'luke'];
var myCharacter = null;
var availableEnemies = [];
var defender = null;
var defeatedEnemies = [];


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

//restartBtnClick 

var gameState = 0;


var AttackBtnClick = function() {
	if(gameState === 2) {
		var myAttackHtml;
		var enemyCounterAttackHtml;
		var winLoseMessageHtml;
		var myAttackPoints = allCharacters[myCharacter].calcAttackPoints();
		var enemyAttackPoints = allCharacters[defender].calcAttackPoints();
		myAttackHtml = "You attacked " + allCharacters[defender].getName() + " for " + myAttackPoints.toString() + " damaage";
		enemyCounterAttackHtml = allCharacters[defender].getName() + " attacked you for " + enemyAttackPoints.toString() + " damage";

		$('#myAttack').text(myAttackHtml);
		$('#enemyCounterAttack').text(enemyCounterAttackHtml);


		allCharacters[myCharacter].setHealthUnit(allCharacters[myCharacter].getHealthUnit() - enemyAttackPoints);
		allCharacters[defender].setHealthUnit(allCharacters[defender].getHealthUnit() - myAttackPoints);

		console.log(myCharacter + " Health: " + allCharacters[myCharacter].getHealthUnit().toString());
		console.log(defender + " Health: " + allCharacters[defender].getHealthUnit().toString());

		if (allCharacters[myCharacter].getHealthUnit() <= 0) {
			//I lose
			console.log("I Lose");
			winLoseMessageHtml = "You have been defeated by " + allCharacters[defender].getName() + ", refresh to restart the game"
			$('#winLoseMessage').text(winLoseMessageHtml);
			gameState = 3;

		}
		if (allCharacters[defender].getHealthUnit() <=0 ) {
			//I Win
			console.log("I Win");
			winLoseMessageHtml = "You have defeated " + allCharacters[defender].getName() + ", you can choose to fight another enemy"
			$('#winLoseMessage').text(winLoseMessageHtml);
			gameState = 4;
		}	
	}
}

var availableEnemiesClick = function() {
	if (gameState === 1) {
		//clear the winLoseMessage 

		$('#winLoseMessage').empty();
		$('#myAttack').empty();
		$('#enemyCounterAttack').empty();

		var data_tag = $(this).attr('data')
		console.log("yourcharacter: " + data_tag)

		$('#fightSection').show();
		defender = data_tag;
		charHtml = allCharacters[defender].createHtmlContent('defender');
		$('#fightSection button').click(AttackBtnClick);

		$('#defender .row1').append(charHtml);
		$('#defender').show();
		gameState = 2;
	}
}


var RestartBtnClick = function() {

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

		var myCharHtml = allCharacters[myCharacter].createHtmlContent();
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


// $('#yourCharacter .character').click(function() {
// 	var data_tag = $(this.attr('data'))
// 	console.log("yourcharacter: " + data_tag)

// })



// $('#availableEnemies .character').click()


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

