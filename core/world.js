define(['core/Renderer'], function(Renderer) {
	function World(canvasName, width, height) {
		
		var renderer;
		var worldObjects = [];
		renderer = new Renderer(canvasName, width, height);
	}

	World.prototype.render = function() {

	}

	return World;
})