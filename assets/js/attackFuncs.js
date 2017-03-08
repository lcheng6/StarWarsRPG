var attackFunc = function(baseLevel, randIncrem) {
	var myBaseLevel = baseLevel;
	var myRandIncrem = randIncrem;

	var origBaseLevel = baseLevel;
	var origIncrem = randIncrem
	return {
		attackPoints: function() {
			result = myBaseLevel;
			myBaseLevel = myBaseLevel + Math.ceil(Math.random() * myRandIncrem);
			return result;
		}, 
		reset: function() {
			myBaseLevel = origBaseLevel;
			myRandIncrem = origIncrem;
		}
	} 
}

var counterAttackFunc = function(baseLevel, randIncrem) {
	var myBaseLevel = baseLevel;
	var myRandIncrem = randIncrem
	return {
		counterAttackPoints: function () {
			result = myBaseLevel;
			myBaseLevel = myBaseLevel + Math.ceil(Math.random() * myRandIncrem);
			return result;
		}
	}
}