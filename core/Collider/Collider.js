define(function() {
	var _gameObjects = [];
	

	function Collider(gameObjects) {
		_gameObjects = gameObjects;
	}

	Collider.prototype.circleCollision = function(cObject, circle) {
		if (circle.position.Y - cObject.position.Y > 0 && 
		 	circle.position.Y <= cObject.position.Y + cObject.height &&
	    	 Math.abs(cObject.position.X - circle.position.X) <= circle.radius) {
	    		return 'left';
	    }

	    if (circle.position.Y - cObject.position.Y > 0 && 
		 	circle.position.Y - circle.radius <= cObject.position.Y + cObject.height &&
	    	 Math.abs(cObject.position.X + cObject.width - circle.position.X) <= circle.radius) {
	    		return 'right';
	    }

		if (circle.position.Y - cObject.position.Y < 0 && 
			circle.position.Y + circle.radius >= cObject.position.Y &&
			(circle.position.X - circle.radius <= cObject.position.X + cObject.width && circle.position.X + circle.radius >= cObject.position.X)) {
				return 'top';
		}

		if (circle.position.Y - circle.radius - cObject.position.Y > 0 &&
			circle.position.Y - circle.radius <= cObject.position.Y + cObject.height &&
			(circle.position.X - circle.radius <= cObject.position.X + cObject.width && circle.position.X + circle.radius >= cObject.position.X)) {
				return 'bottom';	
		}
		
		return '';
		
	}

	return Collider;
})