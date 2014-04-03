define(['core/Game', 'core/Vector'], function(Game, Vector) {
	return { 
		Game : new Game(),
		Vector : function(x, y) {
			return new Vector(x, y);
		}
	};
})