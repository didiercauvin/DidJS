define(function() {
	function Movement(gObject) {
		this.shape = {};
	}

	Movement.prototype.setTo = function(gObject) {
		this.shape = gObject;
	}

	Movement.prototype.goToXAxis = function(direction) {
		this.shape.x += this.shape.velX * direction;
	}

	Movement.prototype.goToYAxis = function(direction) {
		this.shape.y += direction;
	}

	return Movement;

})