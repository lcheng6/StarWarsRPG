'use strict'
var character = function(name, characterDataTag, 
	startHealthUnits, cardImg, 
	musicTrack, attackFunc, counterAttackFunc) {
	var priv = {
		name:name,
		characterDataTag: characterDataTag,
		healthUnit: startHealthUnits,
		cardImg:cardImg,
		attackFunc: attackFunc,
		counterAttackFunc: counterAttackFunc
	};

	return {
		createHtmlContent: function (additionalClass) {

			// $('#existingContainer').append(
			// 	  $('<div/>')
			// 	    .attr("id", "newDiv1")
			// 	    .addClass("newDiv purple bloated")
			// 	    .append("<span/>")
			// 	      .text("hello world")
			// 	);
			var result;
			var div1 = $('<div/>')
				.attr("data", priv["characterDataTag"])
				.addClass("character " + additionalClass);
			var span1 = $("<span/>").text(priv["name"]);
			var img1 = $("<img/>").attr('src', priv["cardImg"])
			var span2 = $("<span/>").text(priv["healthUnit"].toString());
			div1.append(span1);
			div1.append(img1);
			div1.append(span2);

			return div1;

		},
		getHealthUnit: function() {
			return priv.healthUnit;
		},
		setHealthUnit: function(healthUnit) {
			priv.healthUnit = healthUnit;
		},
		calcAttackPoints:function() {
			return priv.attackFunc.attackPoints();
		},
		calcCounterAttackPoints:function() {
			return priv.counterAttackFunc.counterAttackPoints();
		},
		getName: function() {
			return priv.name;
		}
	}
}