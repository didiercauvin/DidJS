define(function() {
	var _gameObjects = [];
	

	function Collider(gameObjects) {
		_gameObjects = gameObjects;
	}

	Collider.prototype.collide = function(objectA) {
		
	}

	return Collider;
})