var attackFunc = function(baseLevel, randIncrem) {
	var myBaseLevel = baseLevel;
	var myRandIncrem = randIncrem;
	return {
		attackPoints: function() {
			result = myBaseLevel;
			myBaseLevel = myBaseLevel + Math.ceil(Math.random() * myRandIncrem);
			return result;
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