define(function() {
	function Movement() {
		
	}

	Movement.prototype.move = function(gObject) {
		return { 
			toXAxis : function(direction) {
				gObject.x += gObject.velX * direction;
			},
			toYAxis : function(direction) {
				gObject.y += direction;
			}
		}
	}


	return Movement;

})