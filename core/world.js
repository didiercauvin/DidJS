define(['core/Renderer', 'core/ShapeFactory', 'core/Keyboard'], function(Renderer, ShapeFactory, Keyboard) {
	function World(canvasName, width, height) {
		var _renderer;
		var _shapeFactory;
		var _worldObjects = [];

		_renderer = new Renderer(canvasName, width, height);
		_shapeFactory = new ShapeFactory();

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {
				if (!!obj.keyboard) {
					obj.keyboard.stroke();
				}

				_renderer.draw(obj);
			});

			requestAnimationFrame(gameLoop);
		}

		this.render = function() {
			gameLoop();
		}

		this.create = function(shape, properties) {
			return _shapeFactory.create(shape, properties);
		}

		this.add = function(gameObject) {
			_worldObjects.push(gameObject);
		}

		this.createKeyboard = function(keys) {
			return new Keyboard(keys);
		}

	}

	return World;
})