'use strict'
var character = function(name, characterDataTag, startHealthUnits, cardImg, musicTrack, attackFunc, attackBackFunc) {
	var priv = {
		name:name,
		characterDataTag: characterDataTag,
		healthUnit: startHealthUnits,
		cardImg:cardImg,
		attackFunc: attackFunc,
		attackBackFunc: attackBackFunc
	};

	return {
		createHtmlContent: function () {

		},
		getCurrentHealthUnit: function() {
			return priv.healthUnit;
		},

	}
}