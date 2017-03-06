'use strict'
var allCharacters = {
	obi:character("Obi-Wan Kenobi", "obi", 120, "http://placehold.it/120x80", null, null, null),
	darthSid:character("Darth Sidious", "darthSid", 100, "http://placehold.it/120x80", null, null, null),
	darthMaul:character("Darth Maul", "darthMaul", 150, "http://placehold.it/120x80", null, null, null),
	luke:character("LukeSkyWalker", "luke", 180, "http://placehold.it/120x80", null, null, null),
}
var allCharNames = ['obi', 'darthSid', 'darthMaul', 'luke'];
var myCharacter = null;
var availableEnemies = [];
var defender = null;
var defeatedEnemies = [];


//Initialize the available characters list:

var mychar = allCharacters["obi"];
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
//2: have chosen a enemy,and 
//3: is fighting
//4: fight is done.  
//5: chose another character, reset current play health -> return to 2

var gameState = 0;

var availableEnemiesClick = function() {
	var data_tag = $(this).attr('data')
	console.log("yourcharacter: " + data_tag)

	$('#fightSection').show();
	defender = data_tag;
	charHtml = allCharacters[defender].createHtmlContent('defender');

	$('#defender .row1').append(charHtml);
	$('#defender').show();

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
		myCharacter = allCharacters[data_tag];

		$('#availableCharacters').hide();

		var myCharHtml = myCharacter.createHtmlContent();
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


var fightSectionClikc = function () {
	var data_tag = $(this).attr('data')
}
// $('#fightSection button').click()

$('#defender .character').click(function() {
	var data_tag = $(this).attr('data')
	console.log("yourcharacter: " + data_tag)
})

