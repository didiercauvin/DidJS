define(function() {
	function Movement() {
		
	}

	Movement.prototype.move = function(gObject) {
		return { 
			toXAxis : function(direction) {
				gObject.position.X += gObject.velX * direction;
			},
			toYAxis : function(direction) {
				gObject.position.Y += direction;
			}
		}
	}


	return Movement;

})