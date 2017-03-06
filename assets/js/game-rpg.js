var game = function() {
	var allCharacters = {
		obi:character("Obi-Wan Kenobi", "obi", 120, "http://placehold.it/350x150", null, null, null),
		darthSid:character("Darth Sidious", "darthSid", 120, "http://placehold.it/350x150", null, null, null),
		darthMaul:character("Darth Maul", "darthMaul", 120, "http://placehold.it/350x150", null, null, null),
		luke:character("LukeSkyWalker", "luke", 120, "http://placehold.it/350x150", null, null, null),
	}
	var yourCharacter = null;
	var availableEnemies = [];
	var defender = null;
	var defeatedEnemies = [];

}


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
