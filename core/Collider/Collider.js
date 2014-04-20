define(function() {
	var _gameObjects = [];
	

	function Collider(gameObjects) {
		_gameObjects = gameObjects;
	}

	Collider.prototype.circleCollision = function(cObject, circle) {
		if (circle.position.Y - cObject.position.Y > 0 && 
		 	circle.position.Y - circle.radius <= cObject.position.Y + cObject.height &&
	    	 Math.abs(cObject.position.X - circle.position.X) <= circle.radius) {
	    		return 'left';
	    }

	    else if (circle.position.Y - cObject.position.Y > 0 && 
		 	circle.position.Y - circle.radius <= cObject.position.Y + cObject.height &&
	    	 Math.abs(cObject.position.X + cObject.width - circle.position.X) <= circle.radius) {
	    		return 'right';
	    }

		else if (circle.position.Y - cObject.position.Y < 0 && 
			circle.position.Y + circle.posYForCollision >= cObject.position.Y &&
			(circle.position.X - circle.posXForCollision <= cObject.position.X + cObject.width && circle.position.X + circle.posXForCollision >= cObject.position.X)) {
				return 'top';
		}

		else if (circle.position.Y - circle.posYForCollision - cObject.position.Y > 0 &&
			circle.position.Y - circle.posYForCollision <= cObject.position.Y + cObject.height &&
			(circle.position.X - circle.posXForCollision <= cObject.position.X + cObject.width && circle.position.X + circle.posXForCollision >= cObject.position.X)) {
				return 'bottom';	
		}
		else {
			return '';
		}
	}

	return Collider;
})