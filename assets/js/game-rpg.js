'use strict'
var allCharacters = {
	obi:character("Obi-Wan Kenobi", "obi", 120, "http://placehold.it/120x80", null, null, null),
	darthSid:character("Darth Sidious", "darthSid", 100, "http://placehold.it/120x80", null, null, null),
	darthMaul:character("Darth Maul", "darthMaul", 150, "http://placehold.it/120x80", null, null, null),
	luke:character("LukeSkyWalker", "luke", 180, "http://placehold.it/120x80", null, null, null),
}
var yourCharacter = null;
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



$("#availableCharacters .character").click(function() {
	data_tag = $(this).attr('data');
	console.log("characters: " + data_tag)

	//TODO: select your character
});

$('#yourCharacter .character').click(function() {
	data_tag = $(this.attr('data'))
	console.log("yourcharacter: " + data_tag)

})

$('#availableEnemies .character').click(function() {
	data_tag = $(this.attr('data'))
	console.log("yourcharacter: " + data_tag)
})

$('#fightSection button').click(function() {

})

$('#defender .character').click(function() {
	data_tag = $(this.attr('data'))
	console.log("yourcharacter: " + data_tag)
})

