define(['core/Renderer', 'core/ShapeFactory'], function(Renderer, ShapeFactory) {
	function World(canvasName, width, height) {
		var _renderer;
		var _shapeFactory;
		var _worldObjects = [];
		_renderer = new Renderer(canvasName, width, height);
		_shapeFactory = new ShapeFactory();

		this.render = function() {
			_worldObjects.forEach(function(obj) {
				_renderer.draw(obj);
			});
		}

		this.add = function(shape, properties) {
			var gameObject = _shapeFactory.create(shape, properties);
			_worldObjects.push(gameObject);
		}
	}

	return World;
})